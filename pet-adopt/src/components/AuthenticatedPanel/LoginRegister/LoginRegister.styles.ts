import styled from "styled-components";
import LoginBackground from "./loginBackground.png";

export const DivBackground = styled.div`
  background-image: url(${LoginBackground});
  height: 70vh;
  width: 70vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  @media only screen and (min-width: 2500px) {
    width: 60%;
  }
  @media only screen and (min-width: 3000px) {
    width: 30%;
  }
`;
export const BackgroundContainer = styled.div`
  position: fixed;
  top: 55%;
  left: 51%;
  transform: translate(-50%, -50%);
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 29%;
  @media only screen and (min-height: 1116px) {
    top: 50%;
  }
  @media only screen and (min-height: 1400px) {
    top: 45%;
  }
`;
