import { ImageList } from "@mui/material";
import styled from "styled-components";

export const PetsScreen = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
  align-items: center;
`;

export const StyledImageList = styled(ImageList)`
  height: 50rem;
  overflow: auto;
  display: grid;
  height: calc(100vh - 22rem);
  grid-template-columns: repeat(auto-fill, minmax(4, 1fr));
  gap: 10px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #5a487c, #a8a4d0);
    border-radius: 10px;
    height: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #7a6da8, #d0cbf0);
  }
`;
