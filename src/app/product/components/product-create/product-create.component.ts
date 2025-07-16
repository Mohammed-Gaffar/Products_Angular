import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  loading = false;
  error: string | null = null;
  success = false;

  categories = [
    'beauty',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'kitchen-accessories',
    'laptops',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'mobile-accessories',
    'motorcycle',
    'skin-care',
    'smartphones',
    'sports-accessories',
    'sunglasses',
    'tablets',
    'tops',
    'vehicle',
    'womens-bags',
    'womens-dresses',
    'womens-jewellery',
    'womens-shoes',
    'womens-watches'
  ];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      title: ['crtitm', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      tags: this.fb.array([]),
      brand: ['', Validators.required],
      sku: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0)]],
      dimensions: this.fb.group({
        width: [0, [Validators.required, Validators.min(0)]],
        height: [0, [Validators.required, Validators.min(0)]],
        depth: [0, [Validators.required, Validators.min(0)]]
      }),
      warrantyInformation: [''],
      shippingInformation: [''],
      availabilityStatus: ['In Stock', Validators.required],
      returnPolicy: [''],
      minimumOrderQuantity: [1, [Validators.required, Validators.min(1)]],
      thumbnail: ['', Validators.required],
      images: this.fb.array([])
    });

    // Add initial tag and image inputs
    this.addTag();
    this.addImage();
  }

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control('', Validators.required));
  }

  removeTag(index: number): void {
    if (this.tags.length > 1) {
      this.tags.removeAt(index);
    }
  }

  addImage(): void {
    this.images.push(this.fb.control('', Validators.required));
  }

  removeImage(index: number): void {
    if (this.images.length > 1) {
      this.images.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.error = null;

      const formData = this.productForm.value;
      
      // Filter out empty tags and images
      formData.tags = formData.tags.filter((tag: string) => tag.trim() !== '');
      formData.images = formData.images.filter((image: string) => image.trim() !== '');

      // Add meta data
      formData.meta = {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        barcode: this.generateBarcode(),
        qrCode: `https://dummyjson.com/qr/${formData.sku}`
      };

      // Add empty reviews array
      formData.reviews = [];

      this.productService.addProduct(formData).subscribe({
        next: (product: Product) => {
          console.log('Product created successfully:', product);
          this.success = true;
          this.loading = false;
          
          // Redirect to product list after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.error = 'Failed to create product. Please try again.';
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched();
      }
    });
  }

  private generateBarcode(): string {
    return Math.random().toString().substr(2, 12);
  }

  generateSKU(): void {
    const category = this.productForm.get('category')?.value || 'PROD';
    const randomNum = Math.floor(Math.random() * 10000);
    const sku = `${category.toUpperCase().substr(0, 4)}-${randomNum.toString().padStart(4, '0')}`;
    this.productForm.patchValue({ sku });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['min']) return `${fieldName} must be greater than ${field.errors['min'].min}`;
      if (field.errors['max']) return `${fieldName} must be less than ${field.errors['max'].max}`;
    }
    return '';
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
