import { Box, TextField } from "@mui/material";
import styled from "styled-components";

export const ModalContainer = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  height: 45rem;
  border-radius: 2%;
  background-color: white;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const ModalTop = styled.div`
  margin-bottom: 2rem;
  display: flex;
  height: 10rem;
  background-color: #5a487c;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-family: Conformable;
  color: white;
`;

export const ForumInputsRowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  gap: 2rem;
  margin-bottom: 1.2rem;
  justify-content: space-between;
`;
export const ForumInputsHighRowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15rem;
  gap: 2rem;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  height: auto;
  gap: 2rem;
  align-items: end;
  justify-content: space-between;
  flex: 1;
`;

export const InputContainer = styled.div`
  width: 30rem;
`;

export const DescriptionTextArea = styled(TextField)`
  width: 24rem;
`;

export const InnerButtonContainer = styled.div`
  display: flex;

  gap: 5px;
  margin-bottom: 1rem;
`;
