import { animated } from "react-spring";
import styled from "styled-components";

export const ModalContainer = styled(animated.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  height: 50rem;
  border-radius: 1%;
  background-color: white;
  box-shadow: 24;
  flex-direction: column;
  display: flex;
  padding: 5px;
`;

export const FillFormModalContainer = styled(animated.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const TopModal = styled(animated.div)`
  width: 100%;
  background-color: #5a487c;
  color: white;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MidHighContainer = styled.div`
  height: 20rem;
  width: 100%;
  display: flex;
`;
export const AdopterDetailsContainer = styled.div`
  padding-left: 10px;
  height: 20rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const MidRightDetailsContainer = styled.div`
  height: 20rem;
  gap: 15px;
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PetDetailsTextContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  padding-right: 10px;
  text-align: justify;
  height: 20rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &:hover {
    &::-webkit-scrollbar {
      color: blue;
    }
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #5a487c, #a8a4d0);
      border-radius: 10px;
      transition: ease-in-out;
    }
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #7a6da8, #d0cbf0);
  }
`;
export const DogDetailsRow = styled.div`
  width: fit-content;
`;

export const BottomContainer = styled.div`
  border-top: 1px dotted grey;
  font-family: Conformable;
  height: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const BottomLeftContainer = styled.div`
  display: flex;
  padding-left: 10px;
  flex-direction: column;
  flex: 0 0 40%;
`;
export const BottomCenterContainer = styled.div`
  flex: 0 0 40%;
`;

export const FormTitle = styled.h1`
  font-family: Conformable;
`;

export const FormTextField = styled.input`
  font-size: 1rem;
  height: 20px;
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
`;

export const TextFormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  width: 80%;
  justify-content: space-between;
`;

export const SelectFieldsAdopterDetailsContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const SecondaryTitle = styled.h2`
  font-family: "Conformable";
`;

export const FormTextArea = styled.textarea`
  font-size: 1rem;
  resize: none;
  height: 13rem;
  width: 90%;
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

export const BottomRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
export const PetImage = styled.img`
  object-fit: contain;
  width: 22.5rem;
  height: 15rem;
  border: 3px inset black;
  border-radius: 5px;
  box-shadow: -4px -4px 8px 7px rgb(33 31 34 / 20%);
`;
