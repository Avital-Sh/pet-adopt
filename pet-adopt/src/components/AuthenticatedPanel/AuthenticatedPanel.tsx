import { Navigate } from "react-router";
import Login from "./Login/Login";


const AuthenticatedPanel = () => {

  const auth = localStorage.getItem("Authorization");
  const roles: string[] = localStorage.getItem("Roles")?.split(',') || ['']

  if (!auth) {
    return <Login />
  }

  if (roles?.includes("ADMIN")) {
    return <Navigate to="/admin" />
  }

  return <Navigate to='/user' />



}

export default AuthenticatedPanel;