declare module 'page-metadata-parser' {
  export interface Metadata {
    title?: string;
    description?: string;
    keywords?: string[];
    url?: string;
    language?: string;
    image?: string;
    icon?: string;
    type?: string;
  }

  export function getMetadata(document: Document, url: string): Metadata;
}
