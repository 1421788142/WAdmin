declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;
declare type RefComponent<T> = Partial<InstanceType<T>>

declare type EmitType = (event: string, ...args: any[]) => void;
type Nullable<T> = T | null;
