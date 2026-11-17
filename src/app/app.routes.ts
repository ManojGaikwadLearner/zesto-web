import { Routes } from '@angular/router';
import { PATHS, route, segment } from './common/app-paths';

export const routes: Routes = [
    {
        path: '',
        redirectTo: route(PATHS.restaurantList),
        pathMatch: 'full'
    },
    {
        path: route(PATHS.restaurantList),
        title: 'Restaurant List',
        loadComponent: () => import('./features/restaurant-listing/restaurant-listing').then(m => m.RestaurantListing)
    },
    {
        path: segment(PATHS.foodCatalogue, ':restaurantId'),
        title: 'Food Catalogue',
        loadComponent: () => import('./features/food-catalogue/food-catalogue').then(m => m.FoodCatalogue)
    },
    {
        path: route(PATHS.orderSummary),
        title: 'Order Summary',
        loadComponent: () => import('./features/order-summary/order-summary').then(m => m.OrderSummary)
    },
    {
        path: route(PATHS.pageNotFound),
        title: 'Page not found',
        loadComponent: () => import('./features/page-not-found/page-not-found').then(m => m.PageNotFound)
    },
    {
        path: '**',
        redirectTo: route(PATHS.pageNotFound),
    },
];
