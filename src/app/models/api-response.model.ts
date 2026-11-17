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

export interface User {
    userId: number;
    userName: string;
    userPassword: string;
    address: string;
    city: string;
}

// Create Order Payload interface to send to backend
export interface Order {
    userId: number;
    restaurant: Restaurant;
    foodItemsList: FoodItem[];
}

export interface GetResponseRestaurants extends Array<Restaurant> {}

export interface GetResponseFoodCatalogue {
    restaurant: Restaurant;
    foodItemsList: FoodItem[];
}

export interface GetResponseOrderSaved {
    orderId: number;
    restaurant: Restaurant;
    userDTO: User;
    foodItemsList: FoodItem[];
}
