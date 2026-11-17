import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL_FOOD_CATALOGUE } from '../core/api-urls';
import { Observable } from 'rxjs';
import { GetResponseFoodCatalogue } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class FoodCatalogueService {
    httpClient: HttpClient = inject(HttpClient);
    private readonly baseUrl: string = API_URL_FOOD_CATALOGUE + '/foodCatalogue';
    private readonly foodCatalogueUrl: string = `${this.baseUrl}/fetchRestaurantAndFoodItemsById`;

    getFoodCatalogue(restaurantId: number): Observable<GetResponseFoodCatalogue> {
        return this.httpClient.get<GetResponseFoodCatalogue>(`${this.foodCatalogueUrl}/${restaurantId}`);
    }
}
