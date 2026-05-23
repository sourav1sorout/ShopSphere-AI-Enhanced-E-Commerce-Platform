import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isCheckoutMode = false;
  
  shippingAddress = { street: '', city: '', postalCode: '', country: '' };
  paymentMethod = 'card';
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
    });

    this.route.queryParams.subscribe(params => {
      this.isCheckoutMode = params['checkout'] === 'true';
    });
  }

  placeOrder(): void {
    this.loading = true;
    this.errorMessage = '';
    
    // Fetch cart first to ensure we have items
    this.cartService.getCart().subscribe({
      next: (res) => {
        if (res.success && res.cart.length > 0) {
          const orderData = {
            orderItems: res.cart.map((item: any) => ({
              product: item.product._id,
              quantity: item.quantity,
              price: item.product.price
            })),
            shippingAddress: this.shippingAddress,
            paymentMethod: this.paymentMethod,
            itemsPrice: res.totalAmount,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: res.totalAmount
          };

          this.orderService.placeOrder(orderData).subscribe({
            next: (orderRes) => {
              if (orderRes.success) {
                this.successMessage = 'Order placed successfully!';
                this.cartService.clearCart().subscribe();
                setTimeout(() => {
                  this.router.navigate(['/orders']);
                }, 2000);
              }
            },
            error: (err) => {
              this.errorMessage = err.error.message || 'Error placing order';
              this.loading = false;
            }
          });
        } else {
          this.errorMessage = 'Cart is empty';
          this.loading = false;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to fetch cart';
        this.loading = false;
      }
    });
  }
}
