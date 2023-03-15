/// <reference types="vite/client" />
// types interface/type
/// <reference types="./types/table/index.d.ts" />
/// <reference types="./types/form/index.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
