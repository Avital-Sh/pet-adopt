import { Button } from "@mui/material";
import LoginRegister from "../LoginRegister/LoginRegister"
import * as S from './RegisterCallback.styles'
import useAnimationSequence from "./useAnimationSequence"
import { useNavigate } from "react-router";

const RegisterCallback = () => {
  const navigate = useNavigate();
  const animations = useAnimationSequence();

  return <LoginRegister>
    <S.Headline>
      We got your registration request!
    </S.Headline>
    <S.SubHeadline style={animations[0]}>
      Now.. what you should do next?
    </S.SubHeadline>
    <S.MessageContainer style={animations[1]}>
      1. Wait to be approved by one of the pet-adopt admins.
    </S.MessageContainer>
    <S.MessageContainer style={animations[2]}>
      2. Log in to your personal account.
    </S.MessageContainer>
    <S.MessageContainer style={animations[3]}>
      3. Add you adoption association and upload your pets.
    </S.MessageContainer>
    <S.ButtonContainer style={animations[4]}>
      <Button className="hidden-button" onClick={() => { navigate('/login') }} style={{ pointerEvents: "none" }} color="secondary" variant="contained">Login</Button>
      <Button className="hidden-button" onClick={() => { navigate('/home') }} style={{ pointerEvents: "none" }} color="info" variant="contained">Back Home</Button>
    </S.ButtonContainer>

  </LoginRegister>


}

export default RegisterCallback