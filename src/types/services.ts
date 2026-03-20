export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  features: string[];
  image?: {
    url: string;
    alt: string;
  };
  price?: {
    amount?: number;
    from?: number;
    to?: number;
    currency?: string;
    unit?: string;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  services: Service[];
}
