import { PetFilters } from '../../Pets';
import * as S from './FilterDrawer.style';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Pet, PetSex, PetType } from '../../../../query/PetsQuery';
import FilterItem from './FilterItem/FilterItem';

interface Props {
  onUpdateFilters: (updateFn: () => PetFilters) => void;
  closeModal: () => void
}

interface FilterValues {
  isTypeActive: boolean;
  type: PetType;
  isSexActive: boolean;
  sex: PetSex;
  isAboveAgeActive: boolean;
  aboveAge: number;
  isBelowAgeActive: boolean;
  belowAge: number;
  isBreedActive: boolean;
  breed: string;
  isHealthConditionActive: boolean;
  healthCondition: string;
}

const FilterDrawer = ({ onUpdateFilters, closeModal }: Props) => {
  const [drawerCurrentFilters, setDrawerCurrentFilters] = useState<FilterValues>({
    type: "Dog",
    sex: 'Male',
    aboveAge: 0,
    belowAge: 25,
    breed: "",
    healthCondition: "",
    isSexActive: false,
    isAboveAgeActive: false,
    isBelowAgeActive: false,
    isBreedActive: false,
    isHealthConditionActive: false,
    isTypeActive: false
  });

  const handleApplyFilters = () => {
    onUpdateFilters(() => {
      console.log(drawerCurrentFilters.isTypeActive);

      return {
        ...(drawerCurrentFilters.isTypeActive && {
          type: (pet) => {
            return pet.type === drawerCurrentFilters.type;
          }
        }),
        ...(drawerCurrentFilters.isSexActive && {
          sex: (pet) => {
            return pet.sex === drawerCurrentFilters.sex;
          }
        }),
        ...((drawerCurrentFilters.isAboveAgeActive || drawerCurrentFilters.isBelowAgeActive) && {
          age: (pet) => {
            const age = pet.age;
            const aboveCondition =
              age >= Number(drawerCurrentFilters.aboveAge);
            const belowCondition =
              age <= Number(drawerCurrentFilters.belowAge);
            if (drawerCurrentFilters.isAboveAgeActive && drawerCurrentFilters.isAboveAgeActive) {
              return aboveCondition && belowCondition;
            } else if (drawerCurrentFilters.isAboveAgeActive) {
              return aboveCondition;
            } else if (drawerCurrentFilters.isAboveAgeActive) {
              return belowCondition;
            }
            return true;
          },
        }),
        ...(drawerCurrentFilters.isBreedActive && {
          breed: (pet: Pet) => {
            return pet.breed?.includes(drawerCurrentFilters.breed as string);
          },
        }),

        ...(drawerCurrentFilters.isHealthConditionActive && {
          healthCondition: (pet) => {
            return (
              pet.health === drawerCurrentFilters.healthCondition
            );
          },
        }),
      };
    });
  };

  return (
    <S.DrawerContainer>
      <div>
        <S.Title>Filters</S.Title>

        <S.FiltersContainer>
          <S.FilterTypeRowContainer>
            <FilterItem
              isSelect
              isActive={drawerCurrentFilters.isTypeActive}
              items={["Cat", "Dog"]}
              label="Type"
              value={drawerCurrentFilters.type}
              checkedToggle={() => {
                setDrawerCurrentFilters((prev) => {
                  return { ...prev, isTypeActive: !prev.isTypeActive }
                })
              }}
              handleChange={(event: any) =>
                setDrawerCurrentFilters((prev) => ({ ...prev, type: event.target.value }))
              }
            />
          </S.FilterTypeRowContainer>
          <S.FilterTypeRowContainer>
            <FilterItem
              isSelect
              isActive={drawerCurrentFilters.isSexActive}
              items={["Male", "Female"]}
              label="Sex"
              value={drawerCurrentFilters.sex}
              checkedToggle={() => {
                setDrawerCurrentFilters((prev) => {
                  return { ...prev, isSexActive: !prev.isSexActive }
                })
              }}
              handleChange={(event: any) =>
                setDrawerCurrentFilters((prev) => ({ ...prev, sex: event.target.value }))
              }
            />
          </S.FilterTypeRowContainer>

          <S.FilterTypeRowContainer>
            <FilterItem
              label="Above Age"
              checkedToggle={() => {
                setDrawerCurrentFilters((prev) => {
                  return { ...prev, isAboveAgeActive: !prev.isAboveAgeActive }
                })
              }}
              isActive={drawerCurrentFilters.isAboveAgeActive}
              isSelect={false}
              value={drawerCurrentFilters.aboveAge}
              handleChange={(e: any) =>
                setDrawerCurrentFilters((prev) => ({ ...prev, aboveAge: e.target.value }))
              }
            />
          </S.FilterTypeRowContainer>
          <S.FilterTypeRowContainer>
            <FilterItem
              label="Below Age"
              isActive={drawerCurrentFilters.isBelowAgeActive}
              isSelect={false}
              value={drawerCurrentFilters.belowAge}
              checkedToggle={() => {
                setDrawerCurrentFilters((prev) => {
                  return { ...prev, isBelowAgeActive: !prev.isBelowAgeActive }
                })
              }}
              handleChange={(e: any) =>
                setDrawerCurrentFilters((prev) => ({ ...prev, belowAge: e.target.value }))
              }
            />
          </S.FilterTypeRowContainer>
          <S.FilterTypeRowContainer>
            <FilterItem
              isActive={drawerCurrentFilters.isBreedActive}
              isSelect={false}
              label='Breed'
              value={drawerCurrentFilters.breed}
              handleChange={(e: any) =>
                setDrawerCurrentFilters((prev) => ({ ...prev, breed: e.target.value }))
              }
              checkedToggle={() => {
                setDrawerCurrentFilters((prev) => {
                  return { ...prev, isBreedActive: !prev.isBreedActive }
                })
              }}
            />
          </S.FilterTypeRowContainer>

          <S.FilterTypeRowContainer>
            <FilterItem
              isActive={drawerCurrentFilters.isHealthConditionActive}
              label="Health Condition"
              isSelect={false}
              value={drawerCurrentFilters.healthCondition}
              checkedToggle={() => {
                setDrawerCurrentFilters((prev) => {
                  return { ...prev, isHealthConditionActive: !prev.isHealthConditionActive }
                })
              }}
              handleChange={(e: any) =>
                setDrawerCurrentFilters((prev) => ({
                  ...prev,
                  healthCondition: e.target.value || "None",
                }))
              }
            />
          </S.FilterTypeRowContainer>
        </S.FiltersContainer>
      </div>
      <S.ButtonsContainer>
        <Button color='error' variant='contained' onClick={closeModal}>Close</Button>
        <Button color='secondary' variant='contained' onClick={handleApplyFilters}>Apply</Button>
      </S.ButtonsContainer>

    </S.DrawerContainer >
  );
};

export default FilterDrawer;