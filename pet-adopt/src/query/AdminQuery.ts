import { useMutation, useQuery } from "@tanstack/react-query";
import { Utils } from "../components/Utils/Utils";

interface User {
  id: number; // Represents the unique identifier for the user
  username: string; // The username of the user
  email: string; // The email address of the user
  firstName: string; // The user's first name
  lastName: string; // The user's last name
  roles: string[]; // An array of roles assigned to the user
  isActive: boolean;
}

const useGetAllUsers = () => {
  const getAllUserFn = async () => {
    const auth = localStorage.getItem("Authorization");
    const res = await fetch(`${Utils.getBaseUrl(true)}/admin/getAllUsers`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });

    return res.json();
  };

  return useQuery<User[]>({
    queryKey: ["admin-get-users"],
    queryFn: getAllUserFn,
  });
};

const useActivateUser = () => {
  const activateUserFN = async (userId: number) => {
    const auth = localStorage.getItem("Authorization");
    await fetch(`${Utils.getBaseUrl(true)}/admin/activate/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });
  };

  return useMutation({
    mutationKey: ["admin-activate-user"],
    mutationFn: activateUserFN,
  });
};

const useDeActivateUser = () => {
  const activateUserFN = async (userId: number) => {
    const auth = localStorage.getItem("Authorization");
    await fetch(`${Utils.getBaseUrl(true)}/admin/deactivate/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });
  };

  return useMutation({
    mutationKey: ["admin-deactivate-user"],
    mutationFn: activateUserFN,
  });
};

export const AdminQueries = {
  useGetAllUsers,
  useActivateUser,
  useDeActivateUser,
};
