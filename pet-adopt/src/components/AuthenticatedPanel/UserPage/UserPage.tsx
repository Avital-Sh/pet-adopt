import * as S from './UserPage.styles'
import { Utils } from '../../Utils/Utils';
import { Navigate } from 'react-router';
import AssociationTable from './AssociationTable/AssociationTable';
import AdoptionRequestsTable from './AdoptionRequestTable/AdoptionRequestsTable';


const UserPage = () => {
  const isAuth = Utils.isAuth();

  if (!isAuth) {
    return <Navigate to={"/home"} />
  }
  if (Utils.isAdmin()) {
    return <Navigate to={"/admin"} />
  }

  return <S.AdminPageContainer>

    <S.TablesContainer>
      <AssociationTable />
      <AdoptionRequestsTable />
    </S.TablesContainer>
  </S.AdminPageContainer>
}

export default UserPage;