import { Button, Card, CardActions, Typography } from "@mui/material";
import styled from "styled-components";

export const PetStyledCard = styled(Card)`
  position: relative; /* Make this the reference point for the child */
`;

export const ButtonContainer = styled(CardActions)`
  display: flex;
  justify-content: center;
  background-color: #5a487c;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  &:hover {
    background: linear-gradient(90deg, #ff7e5f, #feb47b);
  }
`;

export const AgeTextContainer = styled(Typography)`
  border-bottom: 1px dashed black;
`;

export const DescriptionText = styled.p`
  font-family: Conformable !important;
  font-size: medium;
  line-height: 1.1rem;
  color: black !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3; /* Change this to the number of lines you want */
`;

export const ApplyButton = styled(Button)`
  color: #fff !important;
  font-family: "Conformable" !important;
`;

export const NameSexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
