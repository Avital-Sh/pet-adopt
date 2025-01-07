import { useMutation, useQuery } from "@tanstack/react-query";

interface Message {
  message: string;
  author: string;
  postedTime?: string;
}

const useGetMessages = () => {
  const getMessagesFn = async () => {
    const data = await fetch("http://localhost:8080/messages");
    return data.json();
  };

  return useQuery<Message[]>({
    queryKey: ["get-all-messages"],
    queryFn: getMessagesFn,
  });
};

const usePostMessage = () => {
  const postMessageFn = async (message: Message) => {
    fetch("http://localhost:8080/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
  return useMutation<void, unknown, Message>({
    mutationKey: ["post-new-message"],
    mutationFn: postMessageFn,
  });
};

export const messageQuery = {
  useGetMessages,
  usePostMessage,
};
