import styled from "styled-components";

export const AppBodyContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 10rem 2rem 10rem;
`;
export const Headline = styled.h1`
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  justify-self: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserLogin = styled.div`
  display: flex;
  padding: 5px;
  cursor: pointer;
`;
export const UserLoginContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const MainContainer = styled.div`
  justify-content: center;
  justify-self: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: 102vh;
  width: 100vw;
  background-image: url("/images/background.png");
  position: fixed;
  top: 0;

  z-index: -1; /* Place it behind content */
`;
