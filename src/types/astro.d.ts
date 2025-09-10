/// <reference types="astro/client" />

declare module 'astro:assets' {
  export interface ImageMetadata {
    src: string;
    width: number;
    height: number;
    format: string;
  }

  export const Image: any;
  export const getImage: any;
}







