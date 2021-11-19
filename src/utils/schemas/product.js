import { object, string, number } from "yup";

export const schema = object({
    title : string().required("title is required, please fill out the field."),
    price : number().required("price is required, please fill out the field."),
    description :string().required("description is required, please fill out the field.") ,
    category : string().required("category is required, please fill out the field.")
});