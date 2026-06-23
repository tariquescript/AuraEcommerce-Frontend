import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://auraecommerce-backend-0h9t.onrender.com/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any) {
    return this.http.post(this.apiUrl, orderData);
  }

  getOrders() {
    return this.http.get(this.apiUrl);
  }
}