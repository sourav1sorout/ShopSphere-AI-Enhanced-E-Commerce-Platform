import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  userName = '';
  cartItemCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.role === 'admin';
      this.userName = user?.name || '';
      
      if (this.isLoggedIn) {
        this.cartService.getCart().subscribe();
      }
    });

    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  logout(): void {
    this.authService.logout();
    this.cartService.clearCart().subscribe();
    this.router.navigate(['/']);
  }
}
