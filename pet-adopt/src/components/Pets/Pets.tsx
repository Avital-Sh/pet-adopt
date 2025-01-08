import { Chip, Drawer, IconButton } from "@mui/material";
import { Pet, petsQueries } from "../../query/PetsQuery";
import PetCard from "./components/PetCard/PetCard";
import * as S from './Pets.styled'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from "react";
import FilterDrawer from "./components/FilterDrawer/FilterDrawer";

export type PetFilters = {
  [key: string]: (pet: Pet) => boolean;
};

const Pets = () => {
  const data = petsQueries.useGetAllPetsQuery() || []
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>();
  const [filters, setFilters] = useState<PetFilters>({});
  console.log(filters);



  return <S.PetsScreen>
    <Drawer open={isFilterDrawerOpen} onClose={() => setIsFilterDrawerOpen(false)}>
      <FilterDrawer onUpdateFilters={setFilters} closeModal={() => setIsFilterDrawerOpen(false)} />
    </Drawer>
    <S.FilterContainer>
      <IconButton onClick={() => { setIsFilterDrawerOpen(true) }}>
        <FilterListIcon fontSize="large" />
      </IconButton>
      {Object.keys(filters).map((key) => {
        return <Chip label={`Filter: ${key}`} onDelete={() => {
          setFilters((prev) => {
            const { [key]: _, ...filteredKey } = prev;
            return filteredKey;
          })
        }} />
      })}
    </S.FilterContainer>
    <S.StyledImageList cols={4} rowHeight={10}>
      {data
        .filter((pet) =>
          Object.keys(filters).every((key) => {
            console.log(key);
            const filterFn = filters[key as keyof PetFilters];
            return filterFn ? filterFn(pet) : true;
          })
        )
        .map((pet) => (
          <PetCard pet={pet} key={pet.id} imageUrl={pet.imageUrl ?? ""} />
        ))}
    </S.StyledImageList>
  </S.PetsScreen>


}

export default Pets;