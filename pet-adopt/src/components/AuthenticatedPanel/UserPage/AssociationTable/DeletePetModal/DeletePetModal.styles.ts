import { Box } from "@mui/material";
import styled from "styled-components";

export const ModalContainer = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: "translate(-50%, -50%)";
  width: 20rem;
  height: 30rem;
  border-radius: 2%;
  background-color: white;
  box-shadow: 24;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  padding: 10px;
`;
