import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { PATHS } from '../../common/app-paths';
import { FoodItem, Order, Restaurant } from '../../models/api-response.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummary implements OnInit {

  private readonly router: Router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly destroyRef = inject(DestroyRef);
  
  readonly PATHS = PATHS;
  readonly restaurant = signal<Restaurant | null>(null);
  readonly foodItems = signal<FoodItem[]>([]);
  readonly totalPrice = signal<number>(0);
  protected readonly submitting = signal(false);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.restaurant.set(this.cartService.cartState.restaurant);
    this.foodItems.set(this.cartService.cartState.foodItemsList);
    this.totalPrice.set(this.cartService.totalPrice);
    this.loading.set(false);
  }

  resetData(): void {
    this.cartService.clearCart(); // clear cart data
    this.router.navigateByUrl(this.PATHS.restaurantList); // navigate back to restaurant-list page
  }

  saveOrder(): void {
    this.submitting.set(true);
    const order: Order = {
      userId: 1,
      restaurant: this.restaurant() as Restaurant,
      foodItemsList: this.foodItems() as FoodItem[]
    };
    this.orderService.saveOrder(order).pipe(
        finalize(() => this.submitting.set(false)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
      next: (response) => {
        alert(`Your Order has been received.\n Order number: ${response.orderId}`);
        this.resetData();
      },
      error: (error) => {
        this.error.set(error);
      }
    });
  }

}
