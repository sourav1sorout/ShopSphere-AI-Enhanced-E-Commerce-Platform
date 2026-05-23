import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  stats: any = null;
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (res) => {
        if (res.success) {
          this.stats = res.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
