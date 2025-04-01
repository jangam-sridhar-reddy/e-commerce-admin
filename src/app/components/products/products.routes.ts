import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from '../add-product/add-product.component';

export const ProductRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
  {
    path: 'edit-product/:id',
    component: AddProductComponent,
  },
];
