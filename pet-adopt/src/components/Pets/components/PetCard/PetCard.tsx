import { CardContent, CardMedia, Typography } from "@mui/material"
import { Utils } from "../../../Utils/Utils"

import * as S from './PetCard.style'
import AdoptionApplyModal from "../AdoptionApplyModal/AdoptionApplyModal"
import { useState } from "react"
import { Pet } from "../../../../query/PetsQuery"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
interface PetCardProps {
  pet: Pet;
  imageUrl: string
}

const PetCard = ({ pet, imageUrl }: PetCardProps) => {
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState<boolean>(false);
  const { age, type, name, description } = pet;
  return (<>
    <AdoptionApplyModal closeModal={() => setIsAdoptionModalOpen(false)} isOpen={isAdoptionModalOpen} pet={pet} />
    <S.PetStyledCard sx={{ maxWidth: 1700, height: 500, boxShadow: 3, margin: 1, width: 300 }} >

      <CardMedia
        component="img"
        height="300"
        width="50"
        image={`${Utils.getBaseImagePath()}/${imageUrl}`}
        alt={type}
      />
      <CardContent>
        <S.NameSexContainer>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          {pet.sex === 'Female' ? <FemaleIcon color="error" /> : <MaleIcon color="primary" />}
        </S.NameSexContainer>
        <S.AgeTextContainer variant="body2" color="text.secondary">
          Age: {age}
        </S.AgeTextContainer>
        <S.DescriptionText>
          {description}
        </S.DescriptionText>
        <S.ButtonContainer>
          <S.ApplyButton onClick={() => setIsAdoptionModalOpen(true)}>Apply for adoption</S.ApplyButton>
        </S.ButtonContainer>
      </CardContent>
    </S.PetStyledCard >
  </>
  );
};

export default PetCard