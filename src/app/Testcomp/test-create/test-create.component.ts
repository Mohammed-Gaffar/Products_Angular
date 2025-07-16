import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test-create.component.html',
  styleUrl: './test-create.component.css'
})
export class TestCreateComponent implements OnInit {
  testForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.testForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: [0, [Validators.required, Validators.min(1), Validators.max(120)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      department:['',[Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.testForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form Data:', this.testForm.value);
        this.submitSuccess = true;
        this.isSubmitting = false;
        this.testForm.reset();
      }, 1000);
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  onReset(): void {
    this.testForm.reset();
    this.submitSuccess = false;
  }

  // Helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.testForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.testForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['min']) return `${fieldName} must be at least ${field.errors['min'].min}`;
      if (field.errors['max']) return `${fieldName} must be at most ${field.errors['max'].max}`;
      if (field.errors['pattern']) return `${fieldName} format is invalid`;
      if(field.errors['department']) return `${fieldName} is required`;
    }
    return '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.testForm.controls).forEach(key => {
      const control = this.testForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}