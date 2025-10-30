export interface Language {
  _id: string;
  languageCode: string;
  languageName: string;
  nativeName: string;
  isEUOfficial: boolean;
}

export interface Address {
  street: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Company {
  name: string;
  address: Address;
  website: string;
  email: string;
}

export interface Safety {
  title: string;
  warnings: string[];
  compliance: string;
  ageRecommendation: string;
}

export interface DetailSection {
  title: string;
  description: string;
  suggestUseAndCare: string[];
  warnings: string | string[];
  compliance?: string;
}

export interface PackSections {
  [key: string]: DetailSection;
}

export interface Pack {
  packType: string;
  packName: string;
  colorScheme: string;
  overview: string;
  whatIsIncluded: string[];
  sections: PackSections;
}

export interface Packs {
  fullPack: Pack;
  basicPack: Pack;
  funPack: Pack;
  standsHolder: Pack;
}

export interface Content {
  packs: Packs;
  company: Company;
}

export interface Translation {
  _id: string;
  languageCode: string;
  languageName: string;
  nativeName: string;
  isEUOfficial: boolean;
  content: Content;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}
