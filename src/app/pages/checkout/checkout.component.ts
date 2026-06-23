import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  submitted = false;
  orderPlaced = false;

  checkoutForm = this.fb.group({
    customerName: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });

  constructor(
    private fb: FormBuilder,
    public cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  get f() {
    return this.checkoutForm.controls;
  }

  placeOrder(): void {
    this.submitted = true;

    if (this.checkoutForm.invalid || this.cartService.getItems().length === 0) {
      return;
    }

    const orderData = {
      customerName: this.checkoutForm.value.customerName,
      address: this.checkoutForm.value.address,
      mobile: this.checkoutForm.value.mobile,
      items: this.cartService.getItems(),
      total: this.cartService.getTotal()
    };

    this.orderService.createOrder(orderData).subscribe({
      next: () => {
        this.orderPlaced = true;

        this.toastr.success(
          'Your order has been placed successfully!',
          'Order Confirmed'
        );

        this.cartService.clearCart();
        this.checkoutForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        console.error('Order creation failed:', error);

        this.toastr.error(
          'Failed to place order.',
          'Error'
        );
      }
    });
  }
}