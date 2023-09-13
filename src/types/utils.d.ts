type JSONString<T> = T & string;

declare global {
    type PromiseReturnType<T> = ReturnType<T> extends Promise<infer R> ? R : any;

    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };
}

/** 深合并，但未完善 */
export type DeepMerge<T extends object, U extends object> = {
    [K in keyof (T & U)]: K extends keyof U
    ? K extends keyof T
    ? T[K] extends object
    ? U[K] extends object
    ? DeepMerge<T[K], U[K]>
    : T[K]
    : U[K]
    : U[K]
    : T[K];
};
export { };