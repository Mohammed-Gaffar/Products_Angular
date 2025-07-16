import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = []; 
  filteredProducts: Product[] = [];
  loading = true;
  error: string | null = null;
  searchTerm = '';
  selectedCategory = '';
  categories: string[] = [];
  sortBy = 'title';
  sortOrder: 'asc' | 'desc' = 'asc';
  private subscription?: Subscription;

  constructor(
    private readonly productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;
    
    this.subscription = this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        console.log('Products loaded:', data);
        this.products = data;
        this.filteredProducts = [...data];
        this.extractCategories();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
      }
    });
  }

  extractCategories(): void {
    const categorySet = new Set(this.products.map(p => p.category));
    this.categories = Array.from(categorySet).sort();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.applyFilters();
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.applyFilters();
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value;
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(this.searchTerm) ||
        product.description.toLowerCase().includes(this.searchTerm) ||
        product.brand.toLowerCase().includes(this.searchTerm) ||
        product.category.toLowerCase().includes(this.searchTerm)
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (this.sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'stock':
          aValue = a.stock;
          bValue = b.stock;
          break;
        case 'discountPercentage':
          aValue = a.discountPercentage;
          bValue = b.discountPercentage;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (this.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    this.filteredProducts = filtered;
  }

  retryLoad(): void {
    this.loadProducts();
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/products', productId, 'edit']);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts(); // Reload the list
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.error = 'Failed to delete product.';
        }
      });
    }
  }

  // Format price with currency symbol
  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  // Calculate discounted price
  getDiscountedPrice(price: number, discountPercentage: number): number {
    if (discountPercentage <= 0) return price;
    return price * (1 - discountPercentage / 100);
  }

  // Get stock status text
  getStockStatus(stock: number): string {
    if (stock === 0) return 'out-of-stock';
    if (stock < 10) return 'low-stock';
    return 'in-stock';
  }

  // Get stock status class for styling
  getStockStatusClass(stock: number): string {
    if (stock === 0) return 'out-of-stock';
    if (stock < 10) return 'low-stock';
    return 'in-stock';
  }

  // View product images in a modal or gallery
  viewImages(product: Product): void {
    // For now, just log the images - you can implement a modal later
    console.log('Product images:', product.images);
    
    // Optional: Open first image in new tab
    if (product.images && product.images.length > 0) {
      window.open(product.images[0], '_blank');
    } else if (product.thumbnail) {
      window.open(product.thumbnail, '_blank');
    }
  }

  // Filter products (alias for applyFilters for template compatibility)
  filterProducts(): void {
    this.applyFilters();
  }
}