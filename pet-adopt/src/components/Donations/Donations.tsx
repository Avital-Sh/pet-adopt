import { userQueries } from "../../query/UsersQuery";
import DonateAssociationCard from "./DonateAssociationCard";
import * as S from './Donations.style'
const Donations = () => {
  const { data } = userQueries.useGetAssociations();


  return <S.AssociationGrid>
    {data?.map(({ description, name }) => {
      return <DonateAssociationCard description={description} name={name} />
    })}
  </S.AssociationGrid>
}
export default Donations;