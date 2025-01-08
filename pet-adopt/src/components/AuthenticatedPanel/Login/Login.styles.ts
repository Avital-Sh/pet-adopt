import styled, { css } from "styled-components";
import { Button } from "@mui/material";

export const LoginHeadline = styled.h1`
  font-family: "Conformable";
  color: white;
  font-size: 5rem;
  margin: 2px;
`;

export const UsernameLoginContainer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  width: 22rem;
`;

export const PasswordLoginContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  width: 22rem;
`;

export const TextFieldLogin = styled.input<{ errorMessage: string }>`
  font-size: 2rem;
  height: 30px;
  width: 15rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  font-family: "Conformable";

  &:focus {
    border-color: rgba(90, 72, 124, 0.7);
    box-shadow: 1px 0px 5px rgba(90, 72, 124, 0.5); /* Adds a subtle glowing effect */
  }
  ${({ errorMessage }) =>
    errorMessage &&
    css`
      border-color: #f1c40f; /* Yellow border for attention */
      background-color: #fffbea; /* Light yellow background */
      box-shadow: 0 0 8px rgba(241, 196, 15, 0.5); /* Subtle glowing effect */
    `}
`;

export const FormText = styled.span`
  font-family: "Conformable";
  color: #24313c;
  font-size: 25px;
`;
export const LoginButton = styled(Button)`
  background-color: #7085a2;
  font-family: "Conformable" !important;
  color: #7085a2;
  font-weight: 900 !important;
  padding-top: 10px !important;
  font-size: 15px !important;
  width: 7rem;
`;

export const TextFieldPassword = styled.input<{ errorMessage: string }>`
  font-size: 2rem;
  width: 15rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  font-family: "Conformable";
  height: 30px;

  &:focus {
    border-color: rgba(90, 72, 124, 0.7);
    box-shadow: 0px 0px 5px rgba(90, 72, 124, 0.5); /* Adds a subtle glowing effect */
  }
  ${({ errorMessage }) =>
    errorMessage &&
    css`
      border-color: #f1c40f; /* Yellow border for attention */
      background-color: #fffbea; /* Light yellow background */
      box-shadow: 0 0 8px rgba(241, 196, 15, 0.5); /* Subtle glowing effect */
    `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 40px;
  font-family: "Conformable" !important;
`;
