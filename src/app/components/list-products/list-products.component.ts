import { Component } from '@angular/core';
import { ManageProductComponent } from '../manage-product/manage-product.component';
import { ProductInterface } from '../../models/product.model'
import { CookiesService } from '../../Services/cookies.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterModule, ManageProductComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

  modalOpen: boolean = false
  isAlertOpen: boolean = false
  tokenLongin: string | null = null
  idProduct: number | null = null
  products: ProductInterface[] = []

  constructor(
    private cookieService: CookiesService,
    private localStorageService: LocalStorageService
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
      this.idProduct = id
      this.toggleModal()
    }
  }

  openModalCreate() {
    this.idProduct = null
    this.toggleModal()
  }

  openAlert(idProduct: number) {
    this.idProduct = idProduct
    this.toggleAlert()
  }

}
