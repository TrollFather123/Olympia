import * as yup from "yup";
import ValidationText from "./ValidationText";



export const UserSchema = yup.object().shape({
    name:yup.string().trim().required(ValidationText?.error?.name),
    email:yup.string().trim().required(ValidationText?.error?.email),
    password:yup.string().trim().required(ValidationText?.error?.password),
    avatar:yup.mixed().required(ValidationText?.error?.avatar)
})

export const LoginSchema = yup.object().shape({
    email:yup.string().trim().required(ValidationText?.error?.email),
    password:yup.string().trim().required(ValidationText?.error?.password),
})

export const ForgetPasswordSchema = yup.object().shape({
    email:yup.string().trim().required(ValidationText?.error?.email),
})

export const CreateCategorySchema = yup.object().shape({
    name:yup.string().trim().required(ValidationText?.error?.name),
    image:yup.mixed().required(ValidationText?.error?.image)
})