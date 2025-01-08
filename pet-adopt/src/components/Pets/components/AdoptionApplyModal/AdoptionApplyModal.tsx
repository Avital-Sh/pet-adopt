import { Button, Modal } from '@mui/material';
import { useFormik } from 'formik';
import * as S from './AdoptionApplyModal.style';
import { applyRequestQueries } from '../../../../query/ApplyRequestQuery';
import { Pet } from '../../../../query/PetsQuery';
import { Utils } from '../../../Utils/Utils';
import { animated, useSpring } from 'react-spring';
import { useState } from 'react';
import * as Yup from "yup";
import SelectInput from '../../../Form/SelectInput';

interface ModalProps {
  isOpen: boolean;
  pet: Pet;
  closeModal: () => void
}

interface ApplyFormValues {
  fullname: string;
  email: string;
  description: string;
  phoneNumber: string;
  address: string;
  occupation: string
  age: number;
  personalStatus: string;
}

const AdoptionApplyModal = ({ isOpen, closeModal, pet }: ModalProps) => {
  const { mutate: apply } = applyRequestQueries.useApplyRequestMutation();
  const ageOptions: number[] = Array.from({ length: 90 - 12 + 1 }, (_, i: number) => i + 12);

  const { submitForm, values, handleChange, resetForm, isValid, dirty, errors, touched } = useFormik<ApplyFormValues>({
    validationSchema: Yup.object().shape({
      fullname: Yup.string()
        .required("Full name is required")
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name can't exceed 50 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
      address: Yup.string()
        .required("Address is required")
        .min(5, "Address must be at least 5 characters")
        .max(100, "Address can't exceed 100 characters"),
      age: Yup.number()
        .required("Age is required")
        .min(12, "Age must be at least 12")
        .max(90, "Age can't exceed 90"),
      occupation: Yup.string()
        .required("Occupation is required")
        .oneOf(
          [
            "Full-time office job",
            "Full time job - Party Remote",
            "Full time job - Fully Remote",
            "Student",
            "Unemployed",
          ],
          "Invalid occupation selected"
        ),
      personalStatus: Yup.string()
        .required("Personal status is required")
        .oneOf(
          ["Single", "Married", "Divorced", "Widow"],
          "Invalid personal status selected"
        ),
    }),
    initialValues: {
      description: '',
      email: '',
      fullname: '',
      phoneNumber: '',
      address: '',
      age: 1,
      occupation: "",
      personalStatus: "",
    },
    onSubmit: (values) => {
      apply({
        email: values.email,
        fullName: values.fullname,
        petId: pet.id || 0, phoneNumber:
          values.phoneNumber,
        age: values.age,
        occupation: values.occupation,
        personalStatus: values.personalStatus,
        requestDescription:
          values.description
      }, {
        onSuccess: () => {
          setIsApplied((prev) => !prev)
        }
      })

    }
  });
  const [isApplied, setIsApplied] = useState(false);

  const propsButton = useSpring({ opacity: isApplied ? 0 : 1 })
  const propsMessage = useSpring({ opacity: isApplied ? 1 : 0 })

  return (<Modal open={isOpen}>
    <S.ModalContainer>
      <S.FillFormModalContainer>
        <S.TopModal>
          <S.FormTitle>Adoption form</S.FormTitle>
        </S.TopModal>
        <S.MidHighContainer>
          <S.AdopterDetailsContainer>
            <S.SecondaryTitle>
              Contact details
            </S.SecondaryTitle>
            <S.TextFormContainer>
              Full name
              <S.FormTextField disabled={isApplied} style={{ ...(errors.fullname && touched.fullname && { border: "2px solid red" }) }} name='fullname' value={values.fullname} onChange={handleChange} />
            </S.TextFormContainer>
            <S.TextFormContainer>
              Email address
              <S.FormTextField disabled={isApplied} style={{ ...(errors.email && touched.email && { border: "2px solid red" }) }} name='email' value={values.email} onChange={handleChange} />
            </S.TextFormContainer>
            <S.TextFormContainer>
              Phone number
              <S.FormTextField disabled={isApplied} style={{ ...(errors.phoneNumber && touched.phoneNumber && { border: "2px solid red" }) }} name='phoneNumber' value={values.phoneNumber} onChange={handleChange} />
            </S.TextFormContainer>
            <S.TextFormContainer>
              Address
              <S.FormTextField disabled={isApplied} style={{ ...(errors.address && touched.address && { border: "2px solid red" }) }} name='address' value={values.address} onChange={handleChange} />
            </S.TextFormContainer>
            <S.SelectFieldsAdopterDetailsContainer>
              <S.TextFormContainer>
                <SelectInput disabled={isApplied} name='personalStatus' value={values.personalStatus} handleChange={handleChange} items={["Single", "Married", "Divorced", "Widow"]} label='Personal status' width='medium' />
              </S.TextFormContainer>
              <S.TextFormContainer>
                <SelectInput disabled={isApplied} name='occupation' value={values.occupation} handleChange={handleChange} items={["Full-time office job", "Full time job - Party Remote", "Full time job - Fully Remote", "Student", "Unemployed"]} label='Occupation' width='medium' />
              </S.TextFormContainer>
              <S.TextFormContainer>
                <SelectInput disabled={isApplied} name='age' value={values.age} handleChange={handleChange} items={ageOptions} label='Age' width='small' />
              </S.TextFormContainer>
            </S.SelectFieldsAdopterDetailsContainer>
          </S.AdopterDetailsContainer>

          <S.MidRightDetailsContainer>
            <S.PetImage src={`${Utils.getBaseImagePath()}/${pet.imageUrl}`} />
          </S.MidRightDetailsContainer>
        </S.MidHighContainer>
        <S.BottomContainer>
          <S.BottomLeftContainer>
            <S.SecondaryTitle>
              Adoption Request
            </S.SecondaryTitle>
            <S.FormTextArea style={{ ...(errors.description && touched.description && { border: "2px solid red" }) }} disabled={isApplied} name='description' value={values.description} onChange={handleChange} />
          </S.BottomLeftContainer>
          <S.BottomCenterContainer>
            <S.PetDetailsTextContainer>
              <S.DogDetailsRow>
                <b>Name:</b> {pet.name}
              </S.DogDetailsRow>
              <S.DogDetailsRow>
                <b>Age:</b>{pet.age}
              </S.DogDetailsRow>
              <S.DogDetailsRow>
                <b>Health-condition:</b> {pet.health}
              </S.DogDetailsRow>
              <S.DogDetailsRow>
                <b>Breed:</b> {pet.breed}
              </S.DogDetailsRow>
              <S.DogDetailsRow>
                <b>Sex:</b> {pet.sex}
              </S.DogDetailsRow>
              <S.DogDetailsRow>
                <b>Description:</b> {pet.description}
              </S.DogDetailsRow>
            </S.PetDetailsTextContainer>
          </S.BottomCenterContainer>
          <S.BottomRightContainer>
            <animated.div style={propsMessage}>
              <div>Thankyou for applying!</div>
              <div>We will get back to you by phone or email shortly!</div>
            </animated.div>
            <animated.div style={propsButton}>
              <Button disabled={isApplied || !isValid || !dirty} variant='contained' color='secondary' onClick={submitForm}>Apply</Button>
            </animated.div>
            <Button variant='contained' color='error' onClick={() => {
              closeModal()
              resetForm();
              setIsApplied(false);
            }}>Close</Button>
            <div />
            <div />
            <div />
            <div />
          </S.BottomRightContainer>
        </S.BottomContainer>
      </S.FillFormModalContainer>
    </S.ModalContainer>
  </Modal >)
}

export default AdoptionApplyModal;
