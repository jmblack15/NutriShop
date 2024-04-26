import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../models/product.model';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() infoProduct!: ProductInterface
}
