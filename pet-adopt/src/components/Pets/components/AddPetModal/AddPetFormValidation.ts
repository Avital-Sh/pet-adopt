import * as Yup from "yup";

const AddPetFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  age: Yup.number()
    .min(1, "Age must be at least 1")
    .max(25, "Age must be at most 25")
    .required("Age is required"),
  sex: Yup.string()
    .oneOf(["Male", "Female"], "Sex must be either Male or Female")
    .required("Sex is required"),
  type: Yup.string()
    .oneOf(["Dog", "Cat"], "Type must be either Dog or Cat")
    .required("Type is required"),
  breed: Yup.string().required("Breed is required"),
  health: Yup.string()
    .oneOf(
      ["Fully Healthy", "Special Needs", "Recovering"],
      "Health condition is invalid"
    )
    .required("Health condition is required"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description must be at most 500 characters")
    .min(20, "Dog description must be at least 20 characters"),
});
export default AddPetFormSchema;
