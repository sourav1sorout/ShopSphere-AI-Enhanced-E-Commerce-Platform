import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  images?: string[];
  stock: number;
  ratings: number;
  numReviews?: number;
  discountPercentage?: number;
  specifications?: any;
  sold?: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(filters: any = {}): Observable<ProductsResponse> {
    let params = new HttpParams();
    
    if (filters.search) params = params.set('search', filters.search);
    if (filters.category) params = params.set('category', filters.category);
    if (filters.minPrice) params = params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params = params.set('maxPrice', filters.maxPrice);
    if (filters.sort) params = params.set('sort', filters.sort);
    if (filters.page) params = params.set('page', filters.page);
    if (filters.limit) params = params.set('limit', filters.limit);
    if (filters.minRating) params = params.set('minRating', filters.minRating);

    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  getFeaturedProducts(limit: number = 8): Observable<any> {
    return this.http.get(`${this.apiUrl}/featured?limit=${limit}`);
  }

  getTrendingProducts(limit: number = 8): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending?limit=${limit}`);
  }

  getBestSellers(limit: number = 8): Observable<any> {
    return this.http.get(`${this.apiUrl}/best-sellers?limit=${limit}`);
  }

  getNewArrivals(limit: number = 8): Observable<any> {
    return this.http.get(`${this.apiUrl}/new-arrivals?limit=${limit}`);
  }

  getTopDeals(limit: number = 8): Observable<any> {
    return this.http.get(`${this.apiUrl}/deals?limit=${limit}`);
  }

  getRelatedProducts(productId: string, limit: number = 6): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}/related?limit=${limit}`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  // Admin methods
  createProduct(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
