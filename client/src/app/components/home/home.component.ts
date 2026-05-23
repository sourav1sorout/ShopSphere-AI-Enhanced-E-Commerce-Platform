import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  trendingProducts: Product[] = [];
  bestSellers: Product[] = [];
  newArrivals: Product[] = [];
  topDeals: Product[] = [];
  categories: string[] = [];
  
  loading = true;
  categoriesLoading = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllProducts();
    this.loadCategories();
  }

  loadAllProducts(): void {
    this.loading = true;
    
    // Load all sections in parallel
    this.productService.getFeaturedProducts(8).subscribe({
      next: (res) => {
        this.featuredProducts = res.products || [];
        this.checkAllLoaded();
      },
      error: (err) => {
        console.error('Error fetching featured products', err);
        this.checkAllLoaded();
      }
    });

    this.productService.getTrendingProducts(8).subscribe({
      next: (res) => {
        this.trendingProducts = res.products || [];
        this.checkAllLoaded();
      },
      error: (err) => {
        console.error('Error fetching trending products', err);
        this.checkAllLoaded();
      }
    });

    this.productService.getBestSellers(8).subscribe({
      next: (res) => {
        this.bestSellers = res.products || [];
        this.checkAllLoaded();
      },
      error: (err) => {
        console.error('Error fetching best sellers', err);
        this.checkAllLoaded();
      }
    });

    this.productService.getNewArrivals(8).subscribe({
      next: (res) => {
        this.newArrivals = res.products || [];
        this.checkAllLoaded();
      },
      error: (err) => {
        console.error('Error fetching new arrivals', err);
        this.checkAllLoaded();
      }
    });

    this.productService.getTopDeals(8).subscribe({
      next: (res) => {
        this.topDeals = res.products || [];
        this.checkAllLoaded();
      },
      error: (err) => {
        console.error('Error fetching top deals', err);
        this.checkAllLoaded();
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.categories || [];
        this.categoriesLoading = false;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.categoriesLoading = false;
      }
    });
  }

  private checkAllLoaded(): void {
    if (
      this.featuredProducts.length > 0 &&
      this.trendingProducts.length > 0 &&
      this.bestSellers.length > 0 &&
      this.newArrivals.length > 0 &&
      this.topDeals.length > 0
    ) {
      this.loading = false;
    }
  }

  getDiscountedPrice(product: Product): number {
    if (product.discountPercentage && product.discountPercentage > 0) {
      return product.price * (1 - product.discountPercentage / 100);
    }
    return product.price;
  }
}
