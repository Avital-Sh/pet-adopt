import { ReactNode } from "react"
import * as S from './LoginRegister.styles'

interface Props {
  children: ReactNode
}

const LoginRegister = ({ children }: Props) => {
  return <S.DivBackground>
    <S.BackgroundContainer>
      {children}
    </S.BackgroundContainer>
  </S.DivBackground>
}

export default LoginRegister;