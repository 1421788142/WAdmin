declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type RefComponent<T> = Partial<InstanceType<T>>
