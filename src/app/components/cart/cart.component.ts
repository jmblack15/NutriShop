import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(public cartService: CartService) { }
  isModalConfirm: boolean = false


  openModal() {
    this.toggleModal()
  }

  toggleModal() {
    this.isModalConfirm = !this.isModalConfirm
  }

  completedPurchase() {
    this.cartService.cleanCart()
    this.toggleModal()
  }
}
