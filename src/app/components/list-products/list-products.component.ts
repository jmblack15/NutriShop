import { Component } from '@angular/core';
import { ManageProductComponent } from '../manage-product/manage-product.component';
import { ProductInterface } from '../../models/product.model'
import { CookiesService } from '../../services/cookies.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterModule, ManageProductComponent, CurrencyPipe, FormsModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

  modalOpen: boolean = false
  isAlertOpen: boolean = false
  isModalToAddCart: boolean = false
  tokenLongin: string | null = null
  idProduct: number | null = null
  products: ProductInterface[] = []
  amountToAddCart: number = 1
  productToAddCart: ProductInterface = {
    name: '',
    description: '',
    price: 0,
    amount: 0
  }


  constructor(
    private cookieService: CookiesService,
    private localStorageService: LocalStorageService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products = this.localStorageService.getProducts('products')
    this.tokenLongin = this.cookieService.getCookie('tokenLogin')
  }


  toggleModal() {
    this.modalOpen = !this.modalOpen
  }

  addProduct(newProduct: ProductInterface) {
    const newID = this.products.length + 1
    const formatedObject = {
      id: newID,
      ...newProduct
    }
    this.products.push(formatedObject);
    this.localStorageService.setProducts('products', this.products)
    this.toggleModal()
  }

  deleteProduct() {
    const indexProduct = this.products.findIndex(product => product.id === this.idProduct)
    this.products.splice(indexProduct, 1)
    console.log(this.products)
    this.localStorageService.setProducts('products', this.products)
    this.toggleAlert()
  }

  updateProduct(updateProduct: ProductInterface) {
    const indexProduct = this.products.findIndex(product => product.id == this.idProduct)
    let updatedProduct = { ...this.products[indexProduct] }
    updatedProduct = updateProduct
    this.products[indexProduct] = updatedProduct
    this.localStorageService.setProducts('products', this.products)
    this.toggleModal()
  }

  toggleAlert() {
    this.isAlertOpen = !this.isAlertOpen
  }

  openModalEdit(id: number | undefined) {
    if (id) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.idProduct = id
      this.toggleModal()
    }
  }

  openModalCreate() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Esto hace que el desplazamiento sea suave
    })
    this.idProduct = null
    this.toggleModal()
  }

  openAlert(id: number | undefined) {
    if (id) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Esto hace que el desplazamiento sea suave
      })
      this.idProduct = id
      this.toggleAlert()
    }
  }

  openModalAddCart(product: ProductInterface) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Esto hace que el desplazamiento sea suave
    })
    this.productToAddCart = product
    this.isModalToAddCart = true
  }

  addProductCart(product: ProductInterface) {
    this.cartService.addProduct(product, this.amountToAddCart)
    this.isModalToAddCart = false
  }

}
