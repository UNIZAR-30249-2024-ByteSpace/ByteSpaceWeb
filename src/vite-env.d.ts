/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg' {
    const content: any;
    export default content;
  }

  