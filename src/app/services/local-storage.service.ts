import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setProducts(name: string, listProducts: ProductInterface[]): void {
    localStorage.setItem(name, JSON.stringify(listProducts))
  }

  getProducts(name: string) {
    const listProductsJSON = localStorage.getItem(name)
    if (listProductsJSON) {
      const listProducts = JSON.parse(listProductsJSON)
      return listProducts
    }

    return []
  }

  delectProduc(name: string) {
    localStorage.removeItem(name);
  }
}
