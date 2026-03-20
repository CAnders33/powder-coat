export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  aspectRatio?: number;
}

export interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
}
