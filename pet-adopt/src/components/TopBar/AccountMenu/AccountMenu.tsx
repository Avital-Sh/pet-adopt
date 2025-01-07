import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const AccountMenu = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('Authorization') !== null;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <div>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      <AccountCircle style={{ fontSize: '60px' }} />
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
      }}>{isAuth ? <>Logout</> : <>Login</>}</MenuItem>
    </Menu>
  </div>
}

export default AccountMenu;