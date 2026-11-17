import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL_ORDER } from '../core/api-urls';
import { Observable } from 'rxjs';
import { GetResponseOrderSaved, Order } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    httpClient: HttpClient = inject(HttpClient);
    private readonly saveOrderUrl: string = API_URL_ORDER + '/order/saveOrder';

    saveOrder(order: Order): Observable<GetResponseOrderSaved> {
        return this.httpClient.post<GetResponseOrderSaved>(this.saveOrderUrl, order);
    }
}
