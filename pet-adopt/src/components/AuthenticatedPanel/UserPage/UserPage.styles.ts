import styled from "styled-components";

export const AdminPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 50rem;
  &::-webkit-scrollbar {
    width: 0px;
  }
  align-items: center;
`;

export const AssociationGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const TablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
