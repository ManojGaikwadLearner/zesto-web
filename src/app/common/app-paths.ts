import { OrderSummary } from "../features/order-summary/order-summary";

export const PATHS = {
  restaurantList: '/restaurant-list',
  foodCatalogue: `/food-catalogue`,
  orderSummary: `/order-summary`,
  pageNotFound: '/page-not-found',
} as const;

export const route = (path: string): string => path.replace(/^\//, '');

/** Same, with parameter segments appended: segment(PATHS.product, ':id') -> 'restaurant/:id' */
export function segment<T extends string>(path: T, ...parts: string[]): string {
  return [route(path), ...parts].join('/');
}