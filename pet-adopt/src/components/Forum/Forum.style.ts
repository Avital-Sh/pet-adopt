import styled from "styled-components";

export const ScrollableContainer = styled.div`
  height: calc(100vh - 250px);
  overflow-y: auto;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #5a487c, #a8a4d0);
    border-radius: 10px;
    height: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #7a6da8, #d0cbf0);
  }
`;

export const ContentContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
`;

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
