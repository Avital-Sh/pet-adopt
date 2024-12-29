

import { Route, Routes } from "react-router";
import * as S from './App.styles';
import Admin from './components/AuthenticatedPanel/AdminPage/Admin';
import AuthenticatedPanel from './components/AuthenticatedPanel/AuthenticatedPanel';
import UserPage from './components/AuthenticatedPanel/UserPage/UserPage';
import Donations from './components/Donations/Donations';
import Home from './components/Home/Home';
import Pets from './components/Pets/Pets';
import TopNavbar from './components/Sidebar/TopNavbar';
import TopBar from './components/TopBar/TopBar';
import Forum from "./components/Forum/Forum";



function App() {

  return (
    <div style={{ justifyContent: "center" }}>
      <S.TopContainer>
        <div />
        <TopBar />
      </S.TopContainer>
      <TopNavbar />
      <S.AppBodyContainer>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/donations' Component={Donations} />
          <Route path='/pets' Component={Pets} />
          <Route path='/login' Component={AuthenticatedPanel} />
          <Route path='/user' Component={UserPage} />
          <Route path='/admin' Component={Admin} />
          <Route path='/forum' Component={Forum} />
        </Routes>
      </S.AppBodyContainer>
    </div>
  );
}

export default App;
