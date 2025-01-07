import { ImageList } from "@mui/material";
import { petsQueries } from "../../query/PetsQuery";
import PetCard from "./components/PetCard/PetCard";
import * as S from './Pets.styled'

const Pets = () => {
  const data = petsQueries.useGetAllPetsQuery() || []
  return <S.PetsScreen>
    <ImageList sx={{ width: 1500, height: 800 }} cols={3} rowHeight={164}>
      {data.map((pet) => (
        <PetCard age={pet.age} name={pet.name} type={pet.type} imageUrl={pet.imageUrl ?? ""} />
      ))}
    </ImageList>
  </S.PetsScreen>


}

export default Pets;