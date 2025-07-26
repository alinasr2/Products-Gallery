import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://fakestoreapi.com/products';

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
