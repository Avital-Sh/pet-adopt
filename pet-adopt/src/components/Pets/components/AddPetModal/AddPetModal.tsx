import { Button, Modal, TextField } from "@mui/material"
import * as S from './AddPetModal.styles'
import SelectInput from "../../../Form/SelectInput"
import { catBreeds, dogBreeds } from "./Breeds"
import { useFormik } from "formik"
import AutoCompleteInput from "../../../Form/AutocompleteInput"
import ImageUploader from "../../../ImageUploader/ImageUploader"
import { petsQueries } from "../../../../query/PetsQuery"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import AddPetFormSchema from "./AddPetFormValidation"

interface ModalProps {
  isOpen: boolean,
  closeModal: () => void,
  associationName: string
}

type HealthCondition = "Fully Healthy" | "Special Needs" | "Recovering";
interface AddPetForm {
  name: string;
  age: number;
  sex: "Male" | "Female"
  type: "Dog" | "Cat"
  breed: string;
  health: "Fully Healthy" | "Special Needs" | "Recovering"
  description: string
}

const AddPetModal = ({ isOpen, closeModal, associationName }: ModalProps) => {
  const { mutate: postNewPet } = petsQueries.usePostNewPetMutation();
  const queryClient = useQueryClient();
  const [imageId, setImageId] = useState<number>(0);

  const numberArray: number[] = Array.from({ length: 25 }, (_, i: number) => i + 1);
  const { handleChange, values, setFieldValue, submitForm, errors, touched, isValid } = useFormik<AddPetForm>({
    initialValues: {
      age: 1,
      name: "",
      sex: "Female",
      type: "Dog",
      breed: "",
      health: "Fully Healthy",
      description: ""
    },
    validationSchema: AddPetFormSchema
    , onSubmit: (values) => {
      postNewPet({
        age: values.age,
        associationName: associationName,
        imageId: imageId,
        breed: values.breed,
        sex: values.sex,
        health: values.health,
        description: values.description,
        name: values.name,
        type: values.type,
      }, {
        onSuccess: () => {
          closeModal();
          queryClient.refetchQueries({ queryKey: ["get-all-pets"] })
        }
      })
    }
  });

  console.log(errors);


  return <Modal open={isOpen}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <S.ModalContainer>
      <S.ModalTop>
        Add A Pet
      </S.ModalTop>
      <S.ForumInputsRowContainer>
        <S.InputContainer>
          <TextField helperText={errors.name} error={Boolean(touched.name && errors.name)} onChange={handleChange} name="name" label="Name" />
        </S.InputContainer>
        <S.InputContainer>
          <SelectInput handleChange={handleChange} value={values.sex} name="sex" items={["Male", "Female"]} label="Sex" width="medium" />
        </S.InputContainer>
        <S.InputContainer>
          <SelectInput error={Boolean(touched.name && errors.name)} handleChange={(e: any) => {
            handleChange(e);
            setFieldValue("breed", "")
          }} value={values.type} name="type" items={["Dog", "Cat"]} label="Type" width="medium" />
        </S.InputContainer>
      </S.ForumInputsRowContainer>
      <S.ForumInputsRowContainer>
        <S.InputContainer>
          <AutoCompleteInput items={values.type === 'Dog' ? dogBreeds : catBreeds} value={values.breed} setFieldValue={setFieldValue} label="Breed" />
        </S.InputContainer>
        <S.InputContainer>
          <SelectInput handleChange={handleChange} value={values.health} name="health" items={["Fully Healthy", "Recovering", "Special Needs"] as HealthCondition[]} label="Health" width="medium" />
        </S.InputContainer>
        <S.InputContainer>
          <SelectInput handleChange={handleChange} value={values.age} name="age" items={numberArray} label="Age" width="medium" />
        </S.InputContainer>
      </S.ForumInputsRowContainer>
      <S.ForumInputsHighRowContainer>
        <S.DescriptionTextArea helperText={errors.description} error={Boolean(touched.description && errors.description)} name="description" multiline rows={9} label="Description" onChange={handleChange} value={values.description} />
        <ImageUploader setImageId={setImageId} />
      </S.ForumInputsHighRowContainer>
      <S.ButtonsContainer>
        <div />
        <div />
        <S.InnerButtonContainer>
          <Button disabled={!isValid || imageId < 1} size="large" variant="contained" color="secondary"
            onClick={submitForm}>Add Pet</Button>
          <Button size="small" variant="contained" color="error" onClick={closeModal}>Cancel</Button>
        </S.InnerButtonContainer>
      </S.ButtonsContainer>
    </S.ModalContainer>
  </Modal >

}

export default AddPetModal