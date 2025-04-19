import { Routes } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { authGuard } from './guard/auth.guard';
import { noAuthGuard } from './guard/no-auth/no-auth.guard';

export const routes: Routes = [
  {
    path: 'authentication',
    component: FullComponent,
    loadChildren: () =>
      import('./authentication/authentication.routes').then(
        (r) => r.AuthenticationRoutes
      ),
    canActivate: [noAuthGuard]
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: FullComponent,
    loadChildren: () =>
      import('./components/products/products.routes').then(
        (r) => r.ProductRoutes
      ),
    canActivate: [authGuard]
  },
  {
    path:'categories',
    component:FullComponent,
    loadChildren: () => import('./components/categories/category.routes').then(r => r.CategoryRoutes),
    canActivate: [authGuard]
  },
  {
    path : 'sub-category',
    component : FullComponent,
    loadChildren : () => import('./components/sub-category/sub-category.routes').then(r => r.subCategoryRoutes),
    canActivate: [authGuard]
  },
  {
    path: '404',
    loadComponent: () =>
      import('./layout/not-found-component/not-found-component.component').then(
        (c) => c.NotFoundComponentComponent
      ),
  },
  { path: '**', redirectTo: '404' }, // Redirect all unknown routes to /404
];
