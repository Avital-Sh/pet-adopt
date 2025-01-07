import { useMutation, useQuery } from "@tanstack/react-query";
export interface Pet {
  age: number;
  name: string;
  type: string;
  imageId: number;
  associationName: string;
  imageUrl?: string;
}
interface ImageUploadResponse {
  imageId: number;
  status: string;
}

const useGetAllPetsQuery = () => {
  const getPost = async (): Promise<Pet[]> => {
    try {
      const response = await fetch("http://localhost:8080/pets");
      return response.json();
    } catch (error) {
      console.log(error);
    }
    return new Promise((res) => {
      res([]);
    });
  };

  const { data } = useQuery({ queryKey: ["get-all-pets"], queryFn: getPost });
  return data;
};

const usePostNewPetMutation = () => {
  const postPet = async (pet: Pet) => {
    try {
      const auth = localStorage.getItem("Authorization");
      await fetch("http://localhost:8080/pets/addPet", {
        method: "POST",
        body: JSON.stringify(pet),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + auth,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return useMutation({ mutationKey: ["post-pet"], mutationFn: postPet });
};

const usePostImageUpload = () => {
  const postPet = async (formData: FormData): Promise<ImageUploadResponse> => {
    try {
      const auth = localStorage.getItem("Authorization");
      const response = await fetch(
        "http://localhost:8080/pets/addPet/uploadImage",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Basic " + auth,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.log(error);
      return { imageId: 0, status: "failed" };
    }
  };
  return useMutation<ImageUploadResponse, unknown, FormData>({
    mutationKey: ["post-pet-image"],
    mutationFn: postPet,
  });
};

export const petsQueries = {
  useGetAllPetsQuery,
  usePostNewPetMutation,
  usePostImageUpload,
};
