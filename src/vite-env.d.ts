/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORTFOLIO_TITLE: string;
  readonly VITE_PORTFOLIO_SUBTITLE: string;
  readonly VITE_PORTFOLIO_DESCRIPTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}