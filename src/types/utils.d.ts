type JSONString<T> = T & string;

declare global {
    type PromiseReturn<T> = ReturnType<T> extends Promise<infer R> ? R : any;

    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };
}
export { };