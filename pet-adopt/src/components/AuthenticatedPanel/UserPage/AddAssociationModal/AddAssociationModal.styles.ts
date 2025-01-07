import { Box, FormControl } from "@mui/material";
import styled from "styled-components";

export const ModalContainer = styled(Box)`
  position: absolute;
  top: 10%;
  left: 42%;
  transform: "translate(-50%, -50%)";
  width: 30rem;
  height: 30rem;
  border-radius: 5%;
  background-color: white;
  box-shadow: 24;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  padding: 10px;
`;

export const ModalHeadline = styled.h1``;

export const FormPanel = styled(FormControl)`
  display: flex;
  gap: 12px;
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 50%;
  flex-direction: column;
`;
