export const PATHS = {
  restaurantList: '/restaurant-list',
  foodCatalogue: `/food-catalogue`,
  checkout: `/checkout`,
  pageNotFound: '/page-not-found',
} as const;

export const route = (path: string): string => path.replace(/^\//, '');

/** Same, with parameter segments appended: segment(PATHS.product, ':id') -> 'restaurant/:id' */
export function segment<T extends string>(path: T, ...parts: string[]): string {
  return [route(path), ...parts].join('/');
}