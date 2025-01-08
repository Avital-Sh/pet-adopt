import PetsIcon from '@mui/icons-material/Pets';
import { AppBar, Box } from "@mui/material";
import AccountMenu from "./AccountMenu/AccountMenu";
import * as S from './TopBar.styles';

const TopBar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <S.StyledToolbar>
        <PetsIcon style={{ fontSize: '50px' }} />
        <S.Headline>
          Adopt A Friend
        </S.Headline>
        <AccountMenu />
      </S.StyledToolbar>
    </AppBar>
  </Box>
)

export default TopBar;