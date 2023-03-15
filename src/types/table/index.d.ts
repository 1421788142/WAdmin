import { tableProps, enumProp } from "./interface";

declare global {
    type wTableEnumProp = enumProp
    type wTableEnumProps = enumProp[]
    type wTableProp = tableProps
    type wTableProps = tableProps[]
}