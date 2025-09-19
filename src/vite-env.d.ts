/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPLICATION_ENDPOINT: string
  readonly VITE_APPLICATION_FILES: string
  readonly VITE_DOC_ROUTE: string
  readonly PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}