export interface Location {
    id: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
  }
  
  export interface Image {
    id: string;
    url: string;
    alt?: string;
    isPrimary: boolean;
  }
  
  export interface Product {
    id: string;
    name: string;
    description?: string;
    category: string;
    seasonal: boolean;
  }
  
  export interface FarmProfile {
    id: string;
    farmerId: string;
    name: string;
    description: string;
    location?: Location;
    images: Image[];
    products: Product[];
    createdAt: string;
    updatedAt: string;
  }