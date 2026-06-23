import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  updateQuantity(productId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cartService.updateQuantity(productId, Number(input.value));
  }
}