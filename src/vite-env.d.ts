/// <reference types="vite/client" />

declare module '*.svg?react' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

interface ImportMetaEnv {
  readonly VITE_PORTFOLIO_TITLE: string;
  readonly VITE_PORTFOLIO_SUBTITLE: string;
  readonly VITE_PORTFOLIO_DESCRIPTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}