import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FoodCatalogueService } from '../../services/food-catalogue.service';
import { PATHS } from '../../common/app-paths';
import { FoodItem, GetResponseFoodCatalogue, Restaurant } from '../../models/api-response.model';
import { catchError, finalize, Observable, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-food-catalogue',
  imports: [CurrencyPipe],
  templateUrl: './food-catalogue.html',
  styleUrl: './food-catalogue.scss',
})
export class FoodCatalogue {

  private readonly route = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly foodCatalogueService = inject(FoodCatalogueService);
  private readonly destroyRef = inject(DestroyRef);
  
  readonly PATHS = PATHS;
  readonly restaurant = signal<Restaurant | null>(null);
  readonly foodItems = signal<FoodItem[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  foodItemCart: FoodItem[] = [];

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => this.loadProducts(params).pipe(
          finalize(() => this.loading.set(false))
        )),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(response => this.successHandler(response));
  }

  private loadProducts(params: ParamMap): Observable<GetResponseFoodCatalogue> {
    const restaurantId = Number(params.get('restaurantId') ?? 1);
    return this.foodCatalogueService.getFoodCatalogue(restaurantId).pipe(
      catchError(() => {
        this.error.set('Could not load Food Catalogue Details.');
        return of({} as GetResponseFoodCatalogue);
      }),
    );

  }

  private successHandler(response: GetResponseFoodCatalogue): void {
    this.restaurant.set(response.restaurant);
    this.cartService.setRestaurant(response.restaurant);
    this.foodItems.set(this.cartService.getFoodItemsOnLoad(response));
    this.error.set(null);
  }

  private updateFoodItems(foodItem: FoodItem): void {
    const exists = this.foodItemCart.some(item => item.id === foodItem.id);

    if (!exists) {
      this.foodItemCart = [...this.foodItemCart, { ...foodItem }];
      this.cartService.updateCartItems(this.foodItemCart);
      return;
    }

    this.foodItemCart = this.foodItemCart
      .map(item => (item.id === foodItem.id ? { ...foodItem } : item))
      .filter(item => item.quantity > 0);

    this.cartService.updateCartItems(this.foodItemCart);
  }

  onCheckout(): void {
    this.router.navigateByUrl(PATHS.orderSummary);
  }

  decrementQuantity(item: FoodItem): void {
    if (item.quantity > 0) {
      item.quantity--;
      this.updateFoodItems(item);
    }
  }

  incrementQuantity(item: FoodItem): void {
    item.quantity++;
    this.updateFoodItems(item);
  }
}
