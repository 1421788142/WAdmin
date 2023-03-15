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
