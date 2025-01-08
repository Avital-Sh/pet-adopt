import styled from "styled-components";

export const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ImageAndUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SuccessMessage = styled.div`
  display: flex;
  justify-content: center;
  font-family: Conformable;
  color: green;
`;

export const Image = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
`;
