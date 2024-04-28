import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent {

  @Input() isOpenModal: boolean = false
  @Input() idProduct: number | null = null
  @Output() closeModalEvent = new EventEmitter();
  @Output() addProductEvent = new EventEmitter();
  @Output() updateProductEvent = new EventEmitter();


  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    amount: new FormControl(0, [Validators.required])
  })

  closeModal() {
    this.closeModalEvent.emit()
  }

  handleProduct() {
    if (this.idProduct) {
      if (this.productForm.valid) {
        const newProduct = this.productForm.value
        this.updateProductEvent.emit(newProduct)
      }
    } else {
      if (this.productForm.valid) {
        const newProduct = this.productForm.value
        this.addProductEvent.emit(newProduct)
      }
    }
  }
}
