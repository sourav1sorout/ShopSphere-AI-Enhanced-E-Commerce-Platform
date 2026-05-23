import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;
  
  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap((res: any) => {
        if (res.success) {
          this.cartCountSubject.next(res.itemCount || 0);
        }
      })
    );
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post(this.apiUrl, { productId, quantity }).pipe(
      tap(() => this.updateCartCount())
    );
  }

  updateQuantity(itemId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${itemId}`, { quantity }).pipe(
      tap(() => this.updateCartCount())
    );
  }

  removeFromCart(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`).pipe(
      tap(() => this.updateCartCount())
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl).pipe(
      tap(() => this.cartCountSubject.next(0))
    );
  }

  private updateCartCount() {
    this.http.get(this.apiUrl).subscribe((res: any) => {
      if (res.success) {
        this.cartCountSubject.next(res.itemCount || 0);
      }
    });
  }
}
