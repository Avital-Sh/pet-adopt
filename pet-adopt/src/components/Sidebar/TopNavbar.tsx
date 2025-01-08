import { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { TabContext } from '@mui/lab';
import { Tab } from '@mui/material';
import * as S from './TopNavbar.styles';
import { Utils } from '../Utils/Utils';

const getOpenTab = (location: any): string => {

  if (location.pathname === '/pets')
    return "pets"
  if (location.pathname === '/home' || location.pathname === '')
    return "home";
  if (location.pathname === '/donations')
    return "donations"
  if (location.pathname === '/forum')
    return "forum";
  if (location.pathname === '/user')
    return "user";
  if (location.pathname === '/admin')
    return "user";
  if (location.pathname === '/register-callback')
    return "home";
  return "home";
}


const TopNavbar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [openTab, setOpenTab] = useState('home');
  useEffect(() => {
    setOpenTab(getOpenTab(location));
  }, [location])

  const onTabChange = (_: SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };

  return (
    <S.TabsContainer>
      <TabContext value={openTab}>
        <S.TabsBox>
          <S.TabsList onChange={onTabChange}>
            <Tab style={{ fontFamily: "Doggie" }} label="Home" value="home" onClick={() => navigate('/')} />
            <Tab style={{ fontFamily: "Doggie" }} label="Pets" value="pets" onClick={() => navigate('/pets')} />
            <Tab style={{ fontFamily: "Doggie" }} label="Donations" value="donations" onClick={() => navigate('/donations')} />
            <Tab style={{ fontFamily: "Doggie" }} label="Share your experience" value="forum" onClick={() => navigate('/forum')} />
            <Tab disabled={!Utils.isAuth()} style={{
              fontFamily: "Doggie",
            }} label="User panel" value="user" onClick={() => navigate('/user')} />
          </S.TabsList>
        </S.TabsBox>
      </TabContext>
    </S.TabsContainer>
  );
}

export default TopNavbar;