import { useMutation, useQuery } from "@tanstack/react-query";
import { Utils } from "../components/Utils/Utils";

export type PetSex = "Male" | "Female";
export type PetType = "Dog" | "Cat";

export interface Pet {
  id?: number;
  age: number;
  name: string;
  type: PetType;
  imageId: number;
  health: string;
  description: string;
  sex: PetSex;
  breed: string;
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
      const response = await fetch(`${Utils.getBaseUrl(true)}/pets`);
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
      await fetch(`${Utils.getBaseUrl(true)}/pets/addPet`, {
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
        `${Utils.getBaseUrl(true)}/pets/addPet/uploadImage`,
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
