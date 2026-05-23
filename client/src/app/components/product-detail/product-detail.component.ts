import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { PriceAlertService } from '../../services/price-alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = true;
  relatedLoading = false;
  quantity = 1;
  isAdding = false;
  selectedImage: string | null = null;

  // Price Alert
  isLoggedIn = false;
  showPriceAlertModal = false;
  targetPrice: number | null = null;
  alertSuccess = '';
  alertError = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private priceAlertService: PriceAlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProduct(id);
      }
    });
  }

  fetchProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.product = res.product;
          this.selectedImage = this.product?.image ?? null;
          this.targetPrice = this.product ? Math.floor(this.product.price * 0.9) : null;
          if (this.product) {
            this.fetchRelatedProducts(id);
          }
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  fetchRelatedProducts(productId: string): void {
    this.relatedLoading = true;
    this.productService.getRelatedProducts(productId, 6).subscribe({
      next: (res) => {
        this.relatedProducts = res.products || [];
        this.relatedLoading = false;
      },
      error: () => {
        this.relatedLoading = false;
      }
    });
  }

  getDiscountedPrice(): number {
    if (this.product && this.product.discountPercentage && this.product.discountPercentage > 0) {
      return this.product.price * (1 - this.product.discountPercentage / 100);
    }
    return this.product?.price || 0;
  }

  addToCart(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.product && this.quantity > 0 && this.quantity <= this.product.stock) {
      this.isAdding = true;
      this.cartService.addToCart(this.product._id, this.quantity).subscribe({
        next: (res) => {
          this.isAdding = false;
          alert('Added to cart!'); // Usually replaced by Toast
        },
        error: (err) => {
          this.isAdding = false;
          alert(err.error.message || 'Error adding to cart');
        }
      });
    }
  }

  setPriceAlert(): void {
    if (!this.targetPrice || !this.product) return;
    
    this.alertSuccess = '';
    this.alertError = '';

    this.priceAlertService.createAlert(this.product._id, this.targetPrice).subscribe({
      next: (res) => {
        if (res.success) {
          this.alertSuccess = res.message;
          setTimeout(() => {
            this.showPriceAlertModal = false;
            this.alertSuccess = '';
          }, 3000);
        }
      },
      error: (err) => {
        this.alertError = err.error.message || 'Failed to set alert';
      }
    });
  }
}
