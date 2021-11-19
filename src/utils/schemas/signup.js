import { object, string, number } from "yup";

export const schema = object({
  firstName: string().required(
    "firstname is required, please fill out the field."
  ),
  lastName: string().required(
    "lastname is required, please fill out the field."
  ),
  numero: string().required(
    "phone number is required, please fill out the field."
  ),
  email: string()
    .required("email is required, please fill out the field.")
    .email(),
  password: string()
    .required("password is required, please fill out the field.")
    .min(8, "password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  address: object({
    lat: number().required(),
    lng: number().required(),
    localisation: string().required(
      "localisation is required, please fill out the field."
    ),
  }),
  role: string().required("role is required, please fill out the field."),
});
