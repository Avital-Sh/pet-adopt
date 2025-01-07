import { useState } from 'react';
import { userQueries } from '../../../query/UsersQuery';
import AddAssociationModal from './AddAssociationModal/AddAssociationModal';
import * as S from './UserPage.styles'
import { Button } from '@mui/material';
import AddPetModal from '../../Pets/components/AddPetModal/AddPetModal';
import { Utils } from '../../Utils/Utils';
import { Navigate } from 'react-router';
import AssociationTable from './AssociationTable/AssociationTable';


const UserPage = () => {
  const isAuth = Utils.isAuth();
  const { data: associations = [] } = userQueries.useGetForAuthUserAssociations();
  const [isOpenAssociationModalOpen, setIsOpenAssociationModalOpen] = useState<boolean>(false)
  const [addToAssociationName, setAddToAssociationName] = useState<string>("")

  if (!isAuth) {
    return <Navigate to={"/home"} />
  }

  return <S.AdminPageContainer>


    <AddAssociationModal closeModal={() => setIsOpenAssociationModalOpen(false)} isOpen={isOpenAssociationModalOpen} />
    <AddPetModal associationName={addToAssociationName} isOpen={addToAssociationName.length > 0} closeModal={() => { setAddToAssociationName("") }} />
    <div>
      <Button variant='contained' onClick={() => setIsOpenAssociationModalOpen(true)}>Add association</Button>
    </div>
    <AssociationTable associations={associations} />
  </S.AdminPageContainer>
}

export default UserPage;