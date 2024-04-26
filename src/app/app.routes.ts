import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';

export const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent,
    title: 'Home page',
  },
  {
    path: 'adminProduct',
    component: ManageProductComponent,
    title: 'Administrador de producto',
  },
];
