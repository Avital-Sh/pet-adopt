import { Alert, Button, FormControlLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { userQueries } from '../../../query/UsersQuery';
import * as S from './LoginRegister.styles';

type LoginOrRegister = "Login" | "Register"

interface UserDetails {
  username: string;
  password: string;
  email: string;
}

const LoginRegister = () => {
  const [formState, setFormState] = useState<UserDetails>({
    email: "",
    username: "",
    password: ""
  })

  const { mutate: registerMutate } = userQueries.useRegisterMutation();
  const { mutate: loginMutate } = userQueries.useUserLoginQuery();
  const [isLoginOrRegister, setIsLoginOrRegister] = useState<LoginOrRegister>('Login')
  const [isLoginErrorOpen, setIsLoginErrorOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (<S.LoginContainer>
    <Snackbar open={isLoginErrorOpen} autoHideDuration={6000} onClose={() => setIsLoginErrorOpen(false)}>
      <Alert onClose={() => setIsLoginErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
        Username and password are incorrect
      </Alert>
    </Snackbar>
    <RadioGroup
      style={{ display: "flex", flexDirection: "row" }}
      onChange={(_: ChangeEvent, value) => {
        setIsLoginOrRegister(value as LoginOrRegister)
      }}
      aria-labelledby="pet-radio-buttons-group-label"
      defaultValue="Login"
      name="radio-buttons-group"
    >
      <FormControlLabel value="Login" control={<Radio />} label="Login" />
      <FormControlLabel value="Register" control={<Radio />} label="Register" />

    </RadioGroup>
    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, username: event.target.value })} label="Username" variant="outlined" />
    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, password: event.target.value })} label="Password" type="password" variant="outlined" />
    {isLoginOrRegister === 'Register' && <><TextField onChange={(event: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, email: event.target.value })} label="Email" type="email" variant="outlined" />
      <Button onClick={() => {
        registerMutate(formState, {
          onSuccess: () => {
            setIsLoginOrRegister('Login')
          }
        })
      }
      }>Register</Button>
    </>
    }
    {isLoginOrRegister === 'Login' && <Button
      onClick={() => loginMutate({ password: formState.password, username: formState.username }, {
        onSuccess: (data) => {
          localStorage.setItem('Authorization', data.bearerToken)
          localStorage.setItem('Roles', data.roles.reduce((prev, curr) => `${prev},${curr}`));
          navigate('/user');
        }, onError: () => {
          setIsLoginErrorOpen(true);
        }
      })}>
      Login
    </Button>}
  </S.LoginContainer >
  )
}

export default LoginRegister;