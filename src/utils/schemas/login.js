import { object, string } from "yup";

export const schema = object({
  email: string().required("No email provided.").email(),
  password: string().required("No password provided."),
});
