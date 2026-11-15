import { Routes } from '@angular/router';
import { PATHS, route } from './common/app-paths';

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
        path: route(PATHS.pageNotFound),
        title: 'Page not found',
        loadComponent: () => import('./features/page-not-found/page-not-found').then(m => m.PageNotFound)
    },
    {
        path: '**',
        redirectTo: route(PATHS.pageNotFound),
    },
];
