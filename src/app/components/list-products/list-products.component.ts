import { Component } from '@angular/core';
import { ManageProductComponent } from '../manage-product/manage-product.component';
import { ProductInterface } from '../../models/product.model'
import { CookiesService } from '../../Services/cookies.service';
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

  constructor(private cookieService: CookiesService) { }

  ngOnInit(): void {
    this.tokenLongin = this.cookieService.get('tokenLogin')
  }

  products: ProductInterface[] = [
    {
      id: 1,
      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 10.99,
      amount: 10
    },
    {
      id: 2,
      name: "Producto 2",
      description: "Descripción del producto 2",
      price: 20.50,
      amount: 20
    },
    {
      id: 3,
      name: "Producto 3",
      description: "Descripción del producto 2",
      price: 20.50,
      amount: 10
    },
  ]

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
    this.toggleModal()
  }

  deleteProduct() {
    const indexProduct = this.products.findIndex(product => product.id === this.idProduct)
    this.products.splice(indexProduct, 1)
    this.toggleAlert()
  }

  updateProduct(updateProduct: ProductInterface) {

    const indexProduct = this.products.findIndex(product => product.id == this.idProduct)
    let updatedProduct = { ...this.products[indexProduct] }
    updatedProduct = updateProduct
    this.products[indexProduct] = updatedProduct
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
