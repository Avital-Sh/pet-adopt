import { Button } from "@mui/material";
import styled from "styled-components";

export const RegisterHeadline = styled.p`
  font-family: "Conformable";
  font-size: 25px;
  max-width: 25rem;
  margin: 1px !important;
  color: white;
`


export const RegisterFormInputsContainer = styled.div`
  display: flex;
  gap: 5rem;
  width: 85%;
  justify-content: center;

`
export const RegisterFormLeftInnerInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
`
export const RegisterFormRightInnerInputsContainer = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 30px;
  justify-content: center;
  flex-direction: column;
`
export const FormInputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 17rem;
`;

export const TextFieldLogin = styled.input`
  font-size: 20px;
  height: 30px;
  width: 10rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  font-family: "Conformable";

  &:focus {
    border-color: rgba(90, 72, 124, 0.7);
    box-shadow: 1px 0px 5px rgba(90, 72, 124, 0.5); /* Adds a subtle glowing effect */
  }
`;

export const FormText = styled.span`
  font-family: "Conformable";
  color: #24313c;
  font-size: 20px;
`;

export const FormButton = styled(Button)`
  background-color: #7085a2;
  font-family: "Conformable" !important;
  color: #7085a2;
  font-weight: 900 !important;
  padding-top: 10px !important;
  font-size: 15px !important;
  width: 7rem;
`;
