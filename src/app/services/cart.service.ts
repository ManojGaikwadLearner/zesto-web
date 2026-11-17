import { inject, Injectable } from '@angular/core';
import { BrowserStorage } from '../core/browser-storage.service';
import { FoodItem, Restaurant } from '../models/api-response.model';

export interface CartState {
  restaurant: Restaurant | null;
  foodItemsList: FoodItem[];
}

const isCart = (v: unknown): v is CartState => {
  return (
    typeof v === 'object' &&
    v !== null &&
    'restaurant' in v &&
    'foodItemsList' in v &&
    Array.isArray(v.foodItemsList) &&
    v.foodItemsList.every(item => typeof item?.id === 'number')
  );
};

@Injectable({
    providedIn: 'root',
})
export class CartService {

    browserStorage: BrowserStorage = inject(BrowserStorage);

    cartState: CartState = { restaurant: null, foodItemsList: [] };
    totalPrice: number = 0;
    totalQuantity: number = 0;

    constructor() {
        let data = this.browserStorage.read('cartState', { restaurant: null, foodItemsList: [] }, isCart);
        if (data != null) {
            this.cartState = data;
            this.computeCartTotals();
        }
    }

    setRestaurant(restaurant: Restaurant | null): void {
        this.cartState.restaurant = restaurant;
        this.persistCartItems();
    }

    updateCartItems(foodItems: FoodItem[]) {
        this.cartState.foodItemsList = [...foodItems];
        this.computeCartTotals();
    }

    persistCartItems(): void {
        this.browserStorage.write('cartState', this.cartState);
    }

    computeCartTotals(): void {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for (let currentCartItem of this.cartState.foodItemsList) {
            totalPriceValue += currentCartItem.price * currentCartItem.quantity;
            totalQuantityValue += currentCartItem.quantity;
        }

        this.totalPrice = totalPriceValue;
        this.totalQuantity = totalQuantityValue;
        
        this.persistCartItems();
    }

    clearCart(): void {
        this.cartState = { restaurant: null, foodItemsList: [] };
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.persistCartItems();
    }
}
