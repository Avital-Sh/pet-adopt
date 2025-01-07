import { useMutation, useQuery } from "@tanstack/react-query";
import { Pet } from "./PetsQuery";

export interface RegistrationRequest {
  username: string;
  password: string;
  email: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserResponse {
  username: string;
  email: string;
  roles: string;
}

interface LoginResponse {
  roles: string[];
  bearerToken: string;
}

interface AssociationRequest {
  name: string;
  description: string;
}

export interface AssociationResponse {
  id: number;
  name: string;
  description: string;
  pets: Pet[];
}

const useRegisterMutation = () => {
  const registerFn = async (requestBody: RegistrationRequest) => {
    try {
      await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return useMutation({
    mutationKey: [`user-register-req`],
    mutationFn: registerFn,
  });
};

const useUserLoginQuery = () => {
  const userLoginFn = async (requestBody: LoginRequest) => {
    const res = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    return res.json();
  };
  return useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: userLoginFn,
    mutationKey: ["user-login"],
  });
};

const useAddAssociation = () => {
  const addAssociationFn = async (reqBody: AssociationRequest) => {
    const auth = localStorage.getItem("Authorization");
    await fetch("http://localhost:8080/association/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + auth,
      },
      body: JSON.stringify(reqBody),
    });
  };

  return useMutation<void, unknown, AssociationRequest>({
    mutationKey: ["add-association"],
    mutationFn: addAssociationFn,
  });
};

const useGetAssociations = () => {
  const getAssociationsFn = async () => {
    const data = await fetch("http://localhost:8080/association", {});
    return data.json();
  };

  return useQuery<AssociationResponse[]>({
    queryKey: ["get-associations"],
    queryFn: getAssociationsFn,
  });
};

const useGetForAuthUserAssociations = () => {
  const auth = localStorage.getItem("Authorization");

  const getAssociationsFn = async () => {
    const data = await fetch("http://localhost:8080/association/currentUser", {
      headers: {
        Authorization: "Basic " + auth,
      },
    });
    return data.json();
  };

  return useQuery<AssociationResponse[]>({
    queryKey: ["get-associations"],
    queryFn: getAssociationsFn,
  });
};

const useGetUserDetails = () => {
  const auth = localStorage.getItem("Authorization");
  const getUserDetailsFn = async () => {
    const data = await fetch("http://localhost:8080/user/currentUser", {
      headers: {
        Authorization: "Basic " + auth,
      },
    });
    return data.json();
  };

  return useQuery<void, unknown, UserResponse>({
    queryKey: ["get-current-user"],
    queryFn: getUserDetailsFn,
    enabled: auth !== undefined,
    refetchOnMount: false,
  });
};

const useRemoveAssociation = () => {
  const auth = localStorage.getItem("Authorization");
  const removeAssociationFn = async (associationId: number) => {
    await fetch(`http://localhost:8080/association/${associationId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + auth,
      },
    });
  };
  return useMutation<void, unknown, number>({
    mutationKey: ["delete-association"],
    mutationFn: removeAssociationFn,
  });
};

export const userQueries = {
  useRegisterMutation,
  useUserLoginQuery,
  useAddAssociation,
  useGetAssociations,
  useGetUserDetails,
  useGetForAuthUserAssociations,
  useRemoveAssociation,
};
