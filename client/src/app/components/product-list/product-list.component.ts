import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  loading = true;
  
  // Filters
  searchTerm = '';
  selectedCategory = '';
  sortOption = 'createdAt';
  minPrice = 0;
  maxPrice = 1000000;
  minRating = 0;
  
  // Prices for range
  priceRange = { min: 0, max: 1000000 };
  
  // View mode
  viewMode: 'grid' | 'list' = 'grid';
  
  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalProducts = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    
    // Listen to query params for search/category changes
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.searchTerm = params['search'] || '';
      this.currentPage = Number(params['page']) || 1;
      this.fetchProducts();
    });
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe(res => {
      if (res.success) {
        this.categories = res.categories;
      }
    });
  }

  fetchProducts(): void {
    this.loading = true;
    const filters = {
      search: this.searchTerm,
      category: this.selectedCategory,
      sort: this.sortOption,
      page: this.currentPage,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minRating: this.minRating
    };

    this.productService.getProducts(filters).subscribe({
      next: (res) => {
        if (res.success) {
          this.products = res.products;
          this.totalPages = res.pagination.totalPages;
          this.totalProducts = res.pagination.totalProducts;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getDiscountedPrice(product: Product): number {
    if (product.discountPercentage && product.discountPercentage > 0) {
      return product.price * (1 - product.discountPercentage / 100);
    }
    return product.price;
  }

  applyFilters(): void {
    // Navigate with new query params
    this.router.navigate(['/shop'], {
      queryParams: {
        category: this.selectedCategory || null,
        search: this.searchTerm || null,
        page: 1 // Reset to first page on filter change
      }
    });
  }

  onSortChange(): void {
    this.fetchProducts();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate(['/shop'], {
        queryParams: {
          category: this.selectedCategory || null,
          search: this.searchTerm || null,
          page
        }
      });
    }
  }
}
