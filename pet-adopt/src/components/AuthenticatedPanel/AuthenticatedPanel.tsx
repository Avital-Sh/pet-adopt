import { Navigate } from "react-router";
import LoginRegister from "./LoginRegister/LoginRegister";

const AuthenticatedPanel = () => {

  const auth = localStorage.getItem("Authorization");
  const roles: string[] = localStorage.getItem("Roles")?.split(',') || ['']

  if (!auth) {
    return <LoginRegister />
  }

  if (roles?.includes("ADMIN")) {
    return <Navigate to="/admin" />
  } else if (roles?.includes("USER")) {
    return <Navigate to='/user' />
  }

  return (<div>Hello</div>)

}

export default AuthenticatedPanel;