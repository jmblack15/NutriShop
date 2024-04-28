import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../models/product.model';
import { CookiesService } from '../../Services/cookies.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {

  tokenLongin: string | null = null;
  @Input() infoProduct!: ProductInterface
  @Output() deleteProductEvent = new EventEmitter()

  constructor(private cookieService: CookiesService) { }

  ngOnInit(): void {
    this.tokenLongin = this.cookieService.get('tokenLogin')
  }

  deleteProduct() {
    this.deleteProductEvent.emit(this.infoProduct.id)
  }


}
