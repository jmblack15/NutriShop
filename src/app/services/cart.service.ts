import { Injectable, EventEmitter } from '@angular/core';
import { ProductInterface } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: ProductInterface[] = [];
  cartQuantityUpdated = new EventEmitter<number>();

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.products = localStorageService.getProducts('cart');
  }


  addProduct(product: any, cuantity: number) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index].amount += cuantity;
    } else {
      this.products.push({ ...product, amount: cuantity });
    }
    this.localStorageService.setProducts('cart', this.products)
    this.cartQuantityUpdated.emit(this.products.length);
  }

  cleanCart() {
    this.products = [];
    this.localStorageService.delectProduc('cart')
  }

  getTotalQuantity(): number {
    return this.products.reduce((total, product) => total + product.amount, 0);
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.products));
    this.cartQuantityUpdated.emit(this.getTotalQuantity());
  }

  totalPice(): number {
    let total = 0
    for (const product of this.products) {
      total += product.price * product.amount
    }

    return total
  }
}
