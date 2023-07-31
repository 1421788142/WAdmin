// JSON
type JSONString<T> = T & string
declare global {
  declare interface JSON {
    stringify<T>(value: T): JSONString<T>
    /**
     * 使用时请给接口加上 & string
     */
    parse<T>(text: JSONString<T>): T
  }
}
declare type IntervalHandle = ReturnType<typeof setInterval>;

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare type ViteEnv = {
  VITE_PROJECT_NAME: string;
  VITE_PORT: number;
  VITE_DEV_OPEN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_REPORT: boolean;
  VITE_PROXY_URL: string;
  VITE_PROJECT_LOGO: string;
  VITE_API_URL: string;
}