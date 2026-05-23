import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount = 0;
  loading = true;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (res) => {
        if (res.success) {
          this.cartItems = res.cart;
          this.totalAmount = res.totalAmount;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  updateQuantity(item: any, newQuantity: number): void {
    if (newQuantity < 1 || newQuantity > item.product.stock) return;
    
    this.cartService.updateQuantity(item._id, newQuantity).subscribe(res => {
      if (res.success) {
        this.cartItems = res.cart;
        this.recalculateTotal();
      }
    });
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId).subscribe(res => {
      if (res.success) {
        this.cartItems = res.cart;
        this.recalculateTotal();
      }
    });
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart().subscribe(res => {
        if (res.success) {
          this.cartItems = [];
          this.totalAmount = 0;
        }
      });
    }
  }

  recalculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

  proceedToCheckout(): void {
    if (this.cartItems.length > 0) {
      // Create order logic will go to a checkout page usually, 
      // but for simplicity we can place order directly or redirect to a form
      this.router.navigate(['/profile'], { queryParams: { checkout: true } });
    }
  }
}
