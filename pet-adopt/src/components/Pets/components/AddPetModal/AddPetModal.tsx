import { Button, FormControlLabel, FormLabel, Input, InputLabel, Modal, Radio, RadioGroup } from "@mui/material"
import * as S from './AddPetModal.styles'
import ImageUploader from "../../../ImageUploader/ImageUploader"
import { ChangeEvent, useState } from "react"
import { petsQueries } from "../../../../query/PetsQuery"
import { useQueryClient } from "@tanstack/react-query"



interface ModalProps {
  isOpen: boolean
  closeModal: () => void
  associationName: string
}

interface FormState {
  age?: number
  name: string
  gender: "Male" | "Female"
  imageId: number
  type: "Dog" | "Cat"
}

const validateForm: (formState: FormState) => boolean = ({ name, age, imageId }) => {
  if (name === '') {
    return false;
  }
  if (age === undefined) {
    return false;
  }
  if (imageId === 0) {
    return false;
  }
  return true;
}



const AddPetModal = ({ isOpen, closeModal, associationName }: ModalProps) => {
  const [showError, setShowError] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate } = petsQueries.usePostNewPetMutation();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    gender: 'Male',
    imageId: 0,
    type: 'Dog'
  });

  const isDisabled = !validateForm(formState);

  return <Modal open={isOpen}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <S.ModalContainer>
      <S.FormContainer>
        <S.ModalHeadline>Add a Pet</S.ModalHeadline>
        <S.FormPanel>
          <InputLabel htmlFor="pet-name">Pet name</InputLabel>
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFormState({ ...formState, name: event.target.value })
            }}
            id="pet-name" aria-describedby="my-helper-text" />
        </S.FormPanel>
        <S.FormPanel>
          <InputLabel htmlFor="pet-age">Pet age</InputLabel>
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFormState({ ...formState, age: Number(event.target.value) })
            }}
            type="number" id="pet-age" aria-describedby="my-helper-text" />
        </S.FormPanel>
        <S.FormPanel>
          <FormLabel id="pet-radio-buttons-group-label">Pet type</FormLabel>
          <RadioGroup
            onChange={(_: ChangeEvent, value) => {
              setFormState({ ...formState, type: value as "Dog" | "Cat" })
            }}
            aria-labelledby="pet-radio-buttons-group-label"
            defaultValue="Dog"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Dog" control={<Radio />} label="Dog" />
            <FormControlLabel value="Cat" control={<Radio />} label="Cat" />
          </RadioGroup>
        </S.FormPanel>
        <S.FormPanel>
          <FormLabel id="pet-radio-buttons-group-label">Pet Gender</FormLabel>
          <RadioGroup
            onChange={(_: ChangeEvent, value) => {
              setFormState({ ...formState, gender: value as "Male" | "Female" })
            }}
            aria-labelledby="pet-radio-buttons-group-label"
            defaultValue="Male"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
          </RadioGroup>
        </S.FormPanel>
        <ImageUploader setImageId={(imageId: number) => setFormState({ ...formState, imageId: imageId })} />
      </S.FormContainer>
      <div>
        <Button onClick={() => {
          setShowError(false);
          closeModal();
        }
        }>Cancel</Button>
        <Button
          disabled={isDisabled}
          onClick={() => {
            const isValid = validateForm(formState)
            if (!isValid) {
              setShowError(true)
            } else {
              mutate({ age: Number(formState.age), name: formState.name, type: formState.type, imageId: formState.imageId, associationName: associationName }, {
                onSuccess: () => {
                  queryClient.refetchQueries({ queryKey: ["get-associations"] })
                  queryClient.refetchQueries({ queryKey: ["get-all-pets"] });
                  closeModal();
                }
              });
            }
          }}>Add</Button>
        {showError && <span>Some fields are missing. please fill out the from.</span>}
      </div>
    </S.ModalContainer>
  </Modal >

}

export default AddPetModal