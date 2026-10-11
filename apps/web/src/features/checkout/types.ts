export type MedusaCartLineItem = {
  id: string;
  quantity: number;
  unit_price: number;
  product_id: string;
  product_handle: string;
  product_title: string;
  thumbnail: string | null;
};

export type MedusaCartAddress = {
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  city: string | null;
  postal_code: string | null;
  country_code: string | null;
  phone: string | null;
};

export type MedusaCartShippingMethod = {
  id: string;
  shipping_option_id: string;
  amount: number;
};

export type MedusaCheckoutCart = {
  id: string;
  region_id: string;
  currency_code: string;
  email: string | null;
  item_total: number;
  shipping_total: number;
  tax_total: number;
  total: number;
  items: MedusaCartLineItem[];
  shipping_address: MedusaCartAddress | null;
  shipping_methods: MedusaCartShippingMethod[];
};

export type MedusaShippingOption = {
  id: string;
  name: string;
  amount: number;
};

export type MedusaRegionCountry = {
  iso_2: string;
  display_name: string;
};

export type MedusaOrderShippingMethod = {
  id: string;
  name: string;
  amount: number;
};

export type MedusaOrder = {
  id: string;
  display_id: number;
  email: string;
  currency_code: string;
  item_total: number;
  shipping_total: number;
  tax_total: number;
  total: number;
  items: MedusaCartLineItem[];
  shipping_address: MedusaCartAddress | null;
  shipping_methods: MedusaOrderShippingMethod[];
};
