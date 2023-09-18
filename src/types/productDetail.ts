export interface IProductDetail {
  id?: string;
  version: number;
  versionModifiedAt: string;
  createdAt: string;
  masterData: IMasterData;
  productType: IProductType;
  taxCategory: IProductType;
}

export interface IProductType {
  typeId: string;
  id: string;
}
interface IMasterData {
  current: ICurrent;
}

export interface ICurrent {
  categories: IProductType[];
  description: { en: string };
  name: { en: string };
  masterVariant: IMasterVariant;
  slug: { en: string };
  staged: object;
}

export interface IMasterVariant {
  attributes: object;
  id: number;
  images: IImage[];
  prices: IPrice[];
}

export interface IPrice {
  id: string;
  value: IProductValue;
}

export interface IProductValue {
  centAmount: number;
  currencyCode: string;
  type: string;
  fractionDigits: number;
}
export interface IImage {
  dimensions?: { w?: number; h?: number };
  url: string;
}
