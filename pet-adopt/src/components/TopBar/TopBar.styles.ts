import { Toolbar } from "@mui/material";
import styled from "styled-components";

export const HeadlineContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  background-color: #5a487c;
  justify-content: space-between;
`;

export const Headline = styled.h1`
  font-size: 70px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  display: flex;
  gap: 1rem;
  align-items: center;
  font-family: Doggie;
`;
