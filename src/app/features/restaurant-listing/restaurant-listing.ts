import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PATHS } from '../../common/app-paths';
import { Restaurant } from '../../models/api-response.model';
import { RestaurantService } from '../../services/restaurant.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-listing',
  imports: [],
  templateUrl: './restaurant-listing.html',
  styleUrl: './restaurant-listing.scss',
})
export class RestaurantListing implements OnInit {

  private readonly router: Router = inject(Router);
  private readonly restaurantService = inject(RestaurantService);
  private readonly destroyRef = inject(DestroyRef);
  
  readonly PATHS = PATHS;
  readonly restaurants = signal<Restaurant[]>([]);
  readonly error = signal<string | null>(null);

  rating = 4.5; // Example rating value, you can replace it with actual data
  ratingCount = 500; // Example rating count, you can replace it with actual data

  ngOnInit(): void {
    this.restaurantService.getRestaurants().pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
      next: (restaurants) => {
        this.restaurants.set(restaurants);
        this.error.set(null);
      },
      error: (err) => {
        console.error('Error fetching restaurants:', err);
        this.error.set('Failed to load restaurants. Please try again later.');
      }
    });
  }

  onOrder(restaurantId: number): void {
    this.router.navigateByUrl(['/food-catalogue', restaurantId].join('/'));
  }
}
