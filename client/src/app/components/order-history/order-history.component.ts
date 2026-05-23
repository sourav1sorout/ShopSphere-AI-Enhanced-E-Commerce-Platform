import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];
  loading = true;
  error = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (res) => {
        if (res.success) {
          this.orders = res.orders;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }
}
