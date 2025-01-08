import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { AssociationResponse } from "../../../../../query/UsersQuery";
import * as S from './DeletePetModal.styles';

interface Props {
  isOpen: boolean
  closeModal: () => void
  association?: AssociationResponse
}

const DeletePetModal = ({ isOpen, closeModal, association }: Props) => {
  const [checked, setChecked] = useState<string[]>([""]);

  const handleToggle = (value: string) => () => {
    if (checked.includes(value)) {
      setChecked((prev) => prev.filter((itemValue) => itemValue !== value))
    } else {
      setChecked((prev) => [...prev, value])
    }

  };
  return <Modal open={isOpen}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <S.ModalContainer>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {association?.pets.map((pet) => {
          const labelId = `checkbox-list-label-${pet.name}`;

          return (
            <ListItem
              key={pet.name}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">

                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(pet.name)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(pet.name)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`Line item ${pet.name + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <IconButton onClick={() => closeModal()}>
        <CloseIcon />
      </IconButton>
    </S.ModalContainer>
  </Modal>

}

export default DeletePetModal;