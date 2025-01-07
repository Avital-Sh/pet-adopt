import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { TabContext } from '@mui/lab';
import { Tab } from '@mui/material';
import * as S from './TopNavbar.styles'


const TopNavbar = () => {
  const navigate = useNavigate();
  const [openTab, setOpenTab] = useState('home');



  const onTabChange = (_: SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };

  return (
    <S.TabsContainer>
      <TabContext value={openTab}>
        <S.TabsBox>
          <S.TabsList onChange={onTabChange}>
            <Tab label="Home" value="home" onClick={() => navigate('/')} />
            <Tab label="Pets" value="pets" onClick={() => navigate('/pets')} />
            <Tab label="Donations" value="donations" onClick={() => navigate('/donations')} />
            <Tab label="Share your experience" value="forum" onClick={() => navigate('/forum')} />
          </S.TabsList>
        </S.TabsBox>
      </TabContext>
    </S.TabsContainer>
  );
}

export default TopNavbar;