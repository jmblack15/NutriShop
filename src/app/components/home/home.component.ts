import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookiesService } from '../../services/cookies.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  cartCuantity: number = 0

  constructor(
    private cookieService: CookiesService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.cartService.cartQuantityUpdated.subscribe(quantity => {
      this.cartCuantity = quantity;
    });
  }

  logOut() {
    this.cookieService.deleteCookie('tokenLogin')
    location.reload()
  }


}
