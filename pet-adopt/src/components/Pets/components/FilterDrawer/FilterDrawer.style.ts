import styled from "styled-components";

export const DrawerContainer = styled.div`
  height: 100%;
  width: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h1`
  margin-left: 10px;
  font-family: Conformable;
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FilterTypeRowContainer = styled.div`
  display: flex;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin: 1rem;
`;
