export interface Restaurant {
    id: number;
    name: string;
    address: string;
    city: string;
    restaurantDescription: string;
}

export interface FoodItem {
    id: number,
    itemName: string,
    itemDescription: string,
    isVeg: boolean,
    price: number,
    restaurantId: number,
    quantity: number
}

export interface GetResponseRestaurants extends Array<Restaurant> {}

export interface GetResponseFoodCatalogue {
    restaurant: Restaurant;
    foodItemsList: FoodItem[];
}
