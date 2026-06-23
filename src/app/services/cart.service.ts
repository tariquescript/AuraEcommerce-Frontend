import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product): void {
    const existingItem = this.items.find(
      item => item.product._id === product._id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        product,
        quantity: 1
      });
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(
      cartItem => cartItem.product._id === productId
    );

    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(
      item => item.product._id !== productId
    );
  }

  clearCart(): void {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getCartCount(): number {
    return this.items.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
}