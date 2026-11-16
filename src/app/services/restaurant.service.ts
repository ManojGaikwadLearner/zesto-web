import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetResponseRestaurants } from '../models/api-response.model';
import { API_URL_RESTAURANT } from '../core/api-urls';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {

    httpClient: HttpClient = inject(HttpClient);
    private readonly baseUrl: string = API_URL_RESTAURANT + '/restaurant';
    private readonly restaurantListUrl: string = `${this.baseUrl}/fetchAllRestaurants`;

    getRestaurants(): Observable<GetResponseRestaurants> {
        return this.httpClient.get<GetResponseRestaurants>(this.restaurantListUrl);
    }

}
