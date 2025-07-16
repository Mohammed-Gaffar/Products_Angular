import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;
  selectedImageIndex = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.error = null;

    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.error = 'Failed to load product details.';
        this.loading = false;
      }
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  editProduct(): void {
    if (this.product) {
      this.router.navigate(['/products', this.product.id, 'edit']);
    }
  }

  deleteProduct(): void {
    if (this.product && confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.error = 'Failed to delete product.';
        }
      });
    }
  }

  getStockStatus(): string {
    if (!this.product) return 'Unknown';
    
    if (this.product.stock === 0) return 'Out of Stock';
    if (this.product.stock < 10) return 'Low Stock';
    return 'In Stock';
  }

  getStockStatusClass(): string {
    if (!this.product) return '';
    
    if (this.product.stock === 0) return 'out-of-stock';
    if (this.product.stock < 10) return 'low-stock';
    return 'in-stock';
  }

  getRatingStars(): string[] {
    if (!this.product) return [];
    
    const rating = Math.round(this.product.rating);
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }
    
    return stars;
  }
}
