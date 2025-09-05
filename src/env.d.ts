/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_HUGGING_FACE_API_KEY: string
  readonly VITE_INTASEND_PUBLIC_KEY: string
  readonly VITE_INTASEND_PRIVATE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}