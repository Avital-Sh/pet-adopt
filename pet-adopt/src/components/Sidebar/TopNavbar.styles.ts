import { TabList } from "@mui/lab";
import { Box } from "@mui/material";
import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10rem;
`;

export const TabsBox = styled(Box)`
  border-bottom: 1px;
  border-color: black;
  justify-content: center;
`;

export const TabsList = styled(TabList)`
  width: max-content;
  justify-content: center;
  align-items: center;
  font-family: "Doggie";
  gap: 100px;
`;
