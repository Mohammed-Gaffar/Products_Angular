import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductResponse } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = 'https://dummyjson.com/products';
  
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductResponse>(this.baseUrl).pipe(
      map(response => response.products)    
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  
  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add`, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<{ isDeleted: boolean; id: number }> {
    return this.http.delete<{ isDeleted: boolean; id: number }>(`${this.baseUrl}/${id}`);
  }
}