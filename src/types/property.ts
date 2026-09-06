export type DealType = 'rent' | 'sale';

export type PropertyType = 'apartment' | 'house' | 'villa' | 'commercial' | 'new_building';

export type RenovationType = 'evro' | 'kosmetik' | 'yangi' | 'qora_suvoq';

export interface PropertyContact {
  name: string;
  phone: string;
  telegram: string;
  isOwner: boolean;
  avatar?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  dealType: DealType; // 'rent' | 'sale'
  propertyType: PropertyType; // 'apartment' | 'house' | etc.
  price: number; // in USD base
  pricePeriod?: 'month' | 'day'; // for rent
  city: string;
  district: string;
  address: string;
  area: number; // m²
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  totalFloors?: number;
  renovation: RenovationType;
  isFurnished: boolean;
  amenities: string[];
  images: string[];
  isFeatured?: boolean;
  isVerified?: boolean;
  viewsCount: number;
  createdAt: string;
  contact: PropertyContact;
  buildYear?: number;
  
  // Extended detailed fields
  ceilingHeight?: number; // e.g. 3.2m
  heatingType?: 'avtonom' | 'markaziy' | 'elektr' | 'gaz';
  cadastreStatus?: boolean; // Kadastr hujjati 100% tayyor
  balcony?: 'mavjud' | 'yoq' | 'terassa';
  parkingType?: 'erosti' | 'ochiq' | 'garaj' | 'yoq' | 'mavjud';
  waterGasElectricity?: 'doimiy' | 'markaziy';
  kitchenArea?: number; // m²
}

export interface FilterState {
  searchQuery: string;
  dealType: DealType | 'all';
  city: string;
  district: string;
  propertyType: PropertyType | 'all';
  minPrice: number | '';
  maxPrice: number | '';
  minArea: number | '';
  maxArea: number | '';
  rooms: number | 'all';
  renovation: RenovationType | 'all';
  isFurnished: boolean | null;
  amenities: string[];
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc';
}

export type Currency = 'USD' | 'UZS';
export type ThemeMode = 'light' | 'dark';
