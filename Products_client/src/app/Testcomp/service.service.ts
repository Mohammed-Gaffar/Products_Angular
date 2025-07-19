import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDto } from './interfaces/testinter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private http: HttpClient;
  private apiUrl = 'https://localhost:7133/api/Products';
  constructor(http: HttpClient) {
    this.http = http;
  }

  getData() {
    return this.http.get(this.apiUrl);
  }

  postData(data: ProductDto):Observable<any> {
    debugger;
    return this.http.post(this.apiUrl , data);
  }

}
