import { tableProps } from "./interface";
import { enumProp } from "../searchForm";

declare global {
    type wTableEnumProp = enumProp
    type wTableEnumProps = enumProp[]
    type wTableProp = tableProps
    type wTableProps = tableProps[]
}