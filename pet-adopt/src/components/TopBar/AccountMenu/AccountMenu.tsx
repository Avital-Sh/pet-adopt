import { useState } from 'react';
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";
import { userQueries } from "../../../query/UsersQuery";
import * as S from './AccountMenu.style'

const AccountMenu = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { data: userData } = userQueries.useGetUserDetails();
  const isAuth = localStorage.getItem('Authorization') !== null;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      {!isAuth ? <AccountCircle style={{ fontSize: '60px' }} /> : <S.LoggedAccount>{`${userData?.firstName.toLocaleUpperCase().slice(0, 1)}.${userData?.lastName.toLocaleUpperCase().slice(0, 1)}`}</S.LoggedAccount>}
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {isAuth && <MenuItem
        onClick={() => navigate('/user')}>
        User panel
      </MenuItem>}
      <MenuItem onClick={() => {
        if (isAuth) {
          localStorage.clear();
          navigate('/home');
        } else {
          navigate('/login');
        }

        handleClose();
      }}>{isAuth ? <>Logout</> : <>Association management login</>}</MenuItem>
    </Menu>
  </>
}

export default AccountMenu;