import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userData = { name: '', email: '', password: '', confirmPassword: '' };
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.userData.password !== this.userData.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = this.userData;

    this.authService.register(registerData).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}
