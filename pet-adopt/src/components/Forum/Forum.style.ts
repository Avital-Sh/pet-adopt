import styled from "styled-components";

export const PostMessageContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5rem;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50rem;
  height: 10rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const AuthText = styled.div`
  margin-left: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
`;

export const PostedTime = styled.div`
  margin-left: 20px;
  font-family: "Courier New", Courier, monospace;
`;

export const MessageText = styled.span`
  margin-left: 20px;
  font-family: "Segoe Script", "Lucida Handwriting", "Comic Sans MS",
    "Apple Chancery", cursive;
`;

export const MessageContainerSubject = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
  height: 50%;
  background-color: #fafbfd;
`;

export const MessageContainerText = styled.div`
  width: auto;
  height: 50%;
  padding-top: 20px;
`;
