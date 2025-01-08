import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AdminQueries as adminQueries } from '../../../query/AdminQuery';
import * as S from './Admin.styles'
const Admin = () => {

  const { data: allUsers, refetch } = adminQueries.useGetAllUsers();
  const { mutate: activateUser } = adminQueries.useActivateUser();
  const { mutate: deactivateUser } = adminQueries.useDeActivateUser();


  return <S.AdminPageContainer>
    <TableContainer component={Paper}>
      <S.AdminTableHeadContainer>
        <S.AdminTableHeadline>
          Association managers
        </S.AdminTableHeadline>
      </S.AdminTableHeadContainer>
      <Table aria-label="simple table">
        <TableHead>

          <TableRow>
            <TableCell>User name</TableCell>
            <TableCell align="right">First name</TableCell>
            <TableCell align="right">Last name</TableCell>
            <TableCell align="right">Roles</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Is active</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers?.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.roles}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.isActive ? <Button variant='contained' color='error' onClick={() => {
                deactivateUser(user.id, {
                  onSuccess: () => {
                    setTimeout(refetch, 100);
                  }
                })
              }}>Deactivate</Button>
                : <Button color='success' variant='contained' onClick={() => {
                  activateUser(user.id, {
                    onSuccess: () => {
                      setTimeout(refetch, 100);
                    },
                  })
                }}>Activate</Button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </S.AdminPageContainer>
}

export default Admin;