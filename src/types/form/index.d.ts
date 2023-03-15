import { formProps } from "./interface";

declare global {
    type wFormProp = formProps
    type wFormProps = formProps[]
}