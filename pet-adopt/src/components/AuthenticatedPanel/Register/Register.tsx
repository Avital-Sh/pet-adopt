import LoginRegister from "../LoginRegister/LoginRegister";
import * as S from './Register.styles';
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { userQueries } from "../../../query/UsersQuery";

interface FormProps {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

const Register = () => {
  const { mutate: register } = userQueries.useRegisterMutation();
  const navigate = useNavigate();
  const { values, isValid, submitForm, handleChange } = useFormik<FormProps>({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      username: ''

    },
    validate: (values) => {
      const errors: Partial<FormProps> = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (values.firstName?.length < 1) {
        errors.firstName = "First name is mandatory";
      }
      if (values.lastName?.length < 1) {
        errors.lastName = "First name is mandatory";
      }
      if (values.username?.length < 3) {
        errors.username = "Username is too short";
      }
      if (values.password?.length < 3) {
        errors.password = "Password is too short";
      }
      if (!emailRegex.test(values.email)) {
        errors.email = "Email address in not valid";
      }
      return errors;
    }
    , onSubmit: (values) => {
      register(values, {
        onSuccess: () => {
          navigate('/register-callback')
        }
      })
    }
  })

  return <LoginRegister>
    <S.RegisterHeadline>Do you have a pet adopt association? Fill up the form and join us!</S.RegisterHeadline>

    <S.RegisterFormInputsContainer>
      <S.RegisterFormLeftInnerInputsContainer>
        <S.FormInputContainer>
          <S.FormText>First name</S.FormText>
          <S.TextFieldLogin name="firstName" value={values.firstName} onChange={handleChange} />
        </S.FormInputContainer>
        <S.FormInputContainer>
          <S.FormText>Last name</S.FormText>
          <S.TextFieldLogin name="lastName" value={values.lastName} onChange={handleChange} />
        </S.FormInputContainer>
        <S.FormInputContainer>
          <S.FormText>Username</S.FormText>
          <S.TextFieldLogin name="username" value={values.username} onChange={handleChange} />
        </S.FormInputContainer>
        <S.FormInputContainer>
          <S.FormText>Password</S.FormText>
          <S.TextFieldLogin type="password" name="password" value={values.password} onChange={handleChange} />
        </S.FormInputContainer>
        <S.FormInputContainer>
          <S.FormText>Email</S.FormText>
          <S.TextFieldLogin name="email" value={values.email} onChange={handleChange} />
        </S.FormInputContainer>
      </S.RegisterFormLeftInnerInputsContainer>
      <S.RegisterFormRightInnerInputsContainer>
        <S.FormButton onClick={() => submitForm()} disabled={!isValid} variant="contained" color="warning">Singup!</S.FormButton>
        <S.FormButton variant="contained" color="warning" onClick={() => navigate('/login')}>🔙 Login</S.FormButton>
      </S.RegisterFormRightInnerInputsContainer>
    </S.RegisterFormInputsContainer>
  </LoginRegister>
}

export default Register;