import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent,
    title: 'Home page',
  },

  {
    path: 'carrito',
    component: CartComponent,
    title: 'Home page | carrito de compras',
  }
];
