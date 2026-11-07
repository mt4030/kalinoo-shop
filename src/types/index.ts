
import type {
  Dispatch,
  FormEventHandler,
  SetStateAction,
} from "react";

import type { EmblaCarouselType } from "embla-carousel";
import type { RouteObject } from "react-router-dom";

// ==========================================
// PRODUCT TYPES
// ==========================================

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: number;
  title: string;
  description: string | null;
  price: number;
  discount_percentage: number;
  rating: number | null;
  stock: number;
  brand: string | null;
  category_id: number;
  thumbnail: string;
  images: string[];
  tags: string[];
  availability_status: string | null;
  weight: number | null;
  dimensions: ProductDimensions | null;
  warranty_information: string | null;
  shipping_information: string | null;
  return_policy: string | null;
  minimum_order_quantity: number;
}

export type ProductSuggestion = Pick<
  Product,
  "id" | "title" | "price" | "thumbnail" | "rating" | "brand"
>;

export interface ProductCardProps {
  product: Product;
}

// ==========================================
// CART TYPES
// ==========================================

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  discount_percentage: number;
  thumbnail: string;
  quantity: number;
}

export type CartProduct = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

export interface MobileProductPurchaseBarBaseProps {
  data: Product;
  finalPrice: number;
  cartItem: CartItem | undefined;
  productId: number;
}

// ==========================================
// CATEGORY TYPES
// ==========================================

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
}

export interface NavigationCategory {
  title: string;
  slug?: string;
  children?: NavigationCategory[];
}

export interface CategoryCarouselItem {
  title: string;
  banner: string;
}

// ==========================================
// SEARCH TYPES
// ==========================================

export type SortBy =
  | "price_asc"
  | "price_desc"
  | "rating"
  | "discount";

export interface SearchPageOptions {
  query?: string;
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  discountedOnly?: boolean;
  sortBy?: SortBy;
  page?: number;
  pageSize?: number;
}

export interface SearchFormProps {
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handelfocus: () => void;
  input: string;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  isSearchOpen: boolean;
}

// ==========================================
// CAROUSEL TYPES
// ==========================================

export interface CarouselDotSlide {
  id: string | number;
}

export interface CarouselDotsProps {
  slides: readonly unknown[];
  api?: EmblaCarouselType;
  classname?: string;
}

// ==========================================
// ROUTER TYPES
// ==========================================

export type AppRoute = RouteObject;
export type AppRoutes = RouteObject[];


////user
export interface DemoCustomer {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthenticatedCustomer {
  id: string;
  email: string | null;
}

export type CustomerSession =
  | {
      mode: "guest";
      user: null;
    }
  | {
      mode: "demo";
      user: DemoCustomer;
    }
  | {
      mode: "authenticated";
      user: AuthenticatedCustomer;
    };