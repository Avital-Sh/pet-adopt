import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material"
import { AssociationResponse, userQueries } from "../../../../query/UsersQuery"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import AddAssociationModal from "../AddAssociationModal/AddAssociationModal";
import AddPetModal from "../../../Pets/components/AddPetModal/AddPetModal";
import { useQueryClient } from "@tanstack/react-query";
import DeletePetModal from "./DeletePetModal/DeletePetModal";

interface Props {
  associations: AssociationResponse[];
}

const AssociationTable = ({ associations }: Props) => {
  const [isOpenAssociationModal, setIsOpenAssociationModal] = useState<boolean>(false);
  const [petToAssociation, setPetToAssociation] = useState<string>("");
  const [isDeletePetAssociationName, setIsDeletePetAssociationName] = useState<AssociationResponse | undefined>(undefined);
  const { mutate: deleteAssociation } = userQueries.useRemoveAssociation();
  const queryClient = useQueryClient();

  return <>
    <AddAssociationModal closeModal={() => setIsOpenAssociationModal(false)} isOpen={isOpenAssociationModal} />
    <AddPetModal associationName={petToAssociation} closeModal={() => { setPetToAssociation("") }} isOpen={petToAssociation !== ""} />
    <DeletePetModal isOpen={isDeletePetAssociationName !== undefined} closeModal={() => setIsDeletePetAssociationName(undefined)} association={isDeletePetAssociationName} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Pets</TableCell>
            <TableCell align="left">Add pets</TableCell>
            <TableCell align="left">Delete pets</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {associations.map((association) => (
            <TableRow
              key={association.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {association.name}
              </TableCell>
              <TableCell align="left">{association.description}</TableCell>
              <TableCell align="left">{association.pets.length}</TableCell>
              <TableCell align="left">
                <IconButton onClick={() => setPetToAssociation(association.name)}>
                  <AddIcon />
                </IconButton>
              </TableCell>
              <TableCell align="left">
                <IconButton onClick={() => setIsDeletePetAssociationName(association)}>
                  <RemoveIcon />
                </IconButton>
              </TableCell>

              <TableCell align="left">
                <IconButton onClick={() => deleteAssociation(association.id, {
                  onSuccess: () => {
                    setTimeout(() => {
                      queryClient.refetchQueries({ queryKey: ['get-associations'] })
                    }, 100)
                  }
                })}>
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}

export default AssociationTable;