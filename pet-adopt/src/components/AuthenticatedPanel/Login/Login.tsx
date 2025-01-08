
import { useNavigate } from 'react-router';
import LoginRegister from '../LoginRegister/LoginRegister';
import * as S from './Login.styles'
import { userQueries } from '../../../query/UsersQuery';
import { useFormik } from 'formik';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

interface FormProps {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { mutate: loginFn } = userQueries.useUserLoginMutation();
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const { values, handleChange, submitForm, errors, isValid } = useFormik<FormProps>({
    validate: (values) => {
      const errors: Partial<FormProps> = {};
      if (values.password.length < 3) {
        errors.password = 'Password must contain at least 4 digits'
      }
      if (values.username.length < 3) {
        errors.username = 'Username must contain at least 4 digits'
      }
      return errors;
    },
    initialErrors: {
      password: '',
      username: ''
    },
    initialValues: {
      password: '',
      username: ''
    }, onSubmit: (values) => {
      loginFn(values, {
        onSuccess: (data) => {
          localStorage.setItem('Authorization', data.bearerToken);
          localStorage.setItem('roles', data.roles.reduce((first, second) => `${first},${second}`));
          if (data.roles.includes('ADMIN')) {
            navigate('/admin');
          } else {
            navigate('/user');
          }

        },
        onError: () => {
          setIsAlertOpen(true);
        }
      });
    }
  });

  return <LoginRegister>
    <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} message="" open={isAlertOpen} onClose={() => setIsAlertOpen(false)} >
      <Alert
        onClose={() => setIsAlertOpen(false)}
        severity="error"
        variant="filled"
      >
        Login failed, Username or password maybe incorrect. Also the use may be need to activate.
      </Alert>

    </Snackbar>
    <S.LoginHeadline>Login</S.LoginHeadline>
    <S.UsernameLoginContainer>
      <S.FormText>Username</S.FormText>
      <S.TextFieldLogin errorMessage={errors.username || ""} name='username' value={values.username} onChange={handleChange} />
    </S.UsernameLoginContainer>
    <S.PasswordLoginContainer>
      <S.FormText>Password</S.FormText>
      <S.TextFieldPassword errorMessage={errors.password || ""} name='password' type='password' value={values.password} onChange={handleChange} />
    </S.PasswordLoginContainer>
    <S.ButtonContainer>
      <S.LoginButton disabled={!isValid} onClick={() => {
        submitForm();
      }} variant='contained' color='warning'>Login</S.LoginButton>
      <S.LoginButton onClick={() => navigate('/register')} variant='contained' color='warning'>Register</S.LoginButton>
    </S.ButtonContainer>


  </LoginRegister >

}

export default Login;