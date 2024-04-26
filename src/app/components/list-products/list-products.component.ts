import { Component } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductInterface } from '../../models/product.model'
import { CookiesService } from '../../Services/cookies.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CardProductComponent, RouterModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {

  tokenLongin: string | null = null;

  constructor(private cookieService: CookiesService) { }

  ngOnInit(): void {
    this.tokenLongin = this.cookieService.get('tokenLogin')
  }

  products: ProductInterface[] = [
    {

      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 10.99,
      amount: 10
    },
    {
      name: "Producto 2",
      description: "Descripción del producto 2",
      price: 20.50,
      amount: 20
    },
    {
      name: "Producto 3",
      description: "Descripción del producto 2",
      price: 20.50,
      amount: 10
    },
  ]
}
