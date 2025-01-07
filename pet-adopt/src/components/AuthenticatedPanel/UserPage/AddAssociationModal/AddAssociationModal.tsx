import { Button, Input, InputLabel, Modal, TextField, Typography } from "@mui/material"
import * as S from './AddAssociationModal.styles'
import { ChangeEvent, useState } from "react"
import { userQueries } from "../../../../query/UsersQuery"
import { useQueryClient } from "@tanstack/react-query"



interface ModalProps {
  isOpen: boolean
  closeModal: () => void
}

interface FormState {
  name: string
  description: string
}

const validateForm: (formState: FormState) => boolean = ({ name, description }) => {
  if (name === '') {
    return false;
  }
  if (description === undefined) {
    return false;
  }
  return true;
}



const AddAssociationModal = ({ isOpen, closeModal }: ModalProps) => {
  const [showError, setShowError] = useState<boolean>(false);
  const { mutate } = userQueries.useAddAssociation();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState<FormState>({
    name: '',
    description: ''
  });


  const isDisabled = !validateForm(formState);

  return <Modal open={isOpen}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <S.ModalContainer>
      <S.FormContainer>
        <S.ModalHeadline>Add association</S.ModalHeadline>
        <S.FormPanel>
          <InputLabel htmlFor="pet-name">Association name</InputLabel>
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFormState({ ...formState, name: event.target.value })
            }}
            id="pet-name" aria-describedby="my-helper-text" />
        </S.FormPanel>
        <Typography variant="caption">
          Association description
        </Typography>
        <S.FormPanel>
          <TextField
            multiline
            variant="filled"
            rows={4}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFormState({ ...formState, description: event.target.value })
            }}
            id="pet-age" aria-describedby="my-helper-text" />
        </S.FormPanel>

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
              mutate({ description: formState.description, name: formState.name }, {
                onSuccess: () => {
                  queryClient.refetchQueries({ queryKey: ["get-associations"] })
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

export default AddAssociationModal