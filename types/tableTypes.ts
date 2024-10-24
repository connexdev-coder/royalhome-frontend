export type actionType = {
  action_key: string;
  path: string;
};

export type categoryType = {
  kr_name: string;
  ar_name: string;
  en_name: string;
};

export type productType = {
  images: string;
  name: string;
  about: string;
  colors: string;
  models: string;
  is_customize: boolean;
  price: number;
  discount: number;
};
