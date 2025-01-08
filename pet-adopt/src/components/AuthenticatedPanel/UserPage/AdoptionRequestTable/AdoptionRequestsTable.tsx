import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { applyRequestQueries } from "../../../../query/ApplyRequestQuery";
import { userQueries } from "../../../../query/UsersQuery";
import * as S from './AdoptionRequestsTable.style'

const AdoptionRequestsTable = () => {

  const { data: applyRequests, refetch } = applyRequestQueries.useGetAdoptionRequestsQuery();
  const { mutate: acceptRequest } = userQueries.useAcceptAdoptionMutation();
  const { mutate: rejectRequest } = userQueries.useRejectAdoptionMutation();

  const updateRequestStatus = () => {
    setTimeout(refetch, 100);
  }
  return (<TableContainer component={Paper}>
    <S.HeadContainer>
      <S.TableHead>
        Adoption requests
      </S.TableHead>
    </S.HeadContainer>

    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Pet</TableCell>
          <TableCell align="left">Full name</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="left">Phone number</TableCell>
          <TableCell align="left">Description</TableCell>
          <TableCell align="left">Occupation</TableCell>
          <TableCell align="left">Personal status</TableCell>
          <TableCell align="left">Age</TableCell>
          <TableCell align="left">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {applyRequests?.map((request) => (
          <TableRow
            key={request.petId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {request.petName}
            </TableCell>
            <TableCell component="th" scope="row">
              {request.fullName}
            </TableCell>
            <TableCell align="left">{request.email}</TableCell>
            <TableCell align="left">{request.phoneNumber}</TableCell>
            <TableCell align="left">
              {request.requestDescription}
            </TableCell>
            <TableCell align="left">{request.occupation}</TableCell>
            <TableCell align="left">{request.personalStatus}</TableCell>
            <TableCell align="left">{request.age}</TableCell>
            <TableCell>{request.requestStatus === 'Pending' ? <div><Button onClick={() => { acceptRequest(request.id); updateRequestStatus(); }}>Accept</Button>
              <Button onClick={() => { rejectRequest(request.id); updateRequestStatus(); }}>Reject</Button></div> : `${request.requestStatus}ed`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>)
}

export default AdoptionRequestsTable;