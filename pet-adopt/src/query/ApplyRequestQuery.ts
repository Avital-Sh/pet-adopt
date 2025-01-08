import { useMutation, useQuery } from "@tanstack/react-query";
import { Utils } from "../components/Utils/Utils";

interface ApplyRequest {
  id: number;
  petId: number;
  petName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  requestDescription: string;
  occupation: string;
  personalStatus: string;
  age: number;
  requestStatus: "Pending" | "Accepted" | "Rejected";
}

const useApplyRequestMutation = () => {
  const applyRequestFn = async (requestBody: Partial<ApplyRequest>) => {
    await fetch(
      `${Utils.getBaseUrl(true)}/applies/apply/${requestBody.petId}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: requestBody.email,
          fullName: requestBody.fullName,
          phoneNumber: requestBody.phoneNumber,
          requestDescription: requestBody.requestDescription,
          age: requestBody.age,
          occupation: requestBody.occupation,
          personalStatus: requestBody.personalStatus,
        } as Partial<ApplyRequest>),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return useMutation<void, unknown, Partial<ApplyRequest>>({
    mutationKey: ["apply-adopt-request"],
    mutationFn: applyRequestFn,
  });
};

const useGetAdoptionRequestsQuery = () => {
  const auth = localStorage.getItem("Authorization");

  const getAdoptionRequestFn = async () => {
    const data = await fetch(`${Utils.getBaseUrl(true)}/applies`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return data.json();
  };

  return useQuery<ApplyRequest[]>({
    queryKey: ["get-adoption-requests"],
    queryFn: getAdoptionRequestFn,
  });
};

export const applyRequestQueries = {
  useApplyRequestMutation,
  useGetAdoptionRequestsQuery,
};
