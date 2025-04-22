import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';  
import {CategoryEffects} from './store/category/category.effects'
import { categoryReducer } from './store/category/category.reducer';
import { subCategoryReducer } from './store/sub-category/subCategory.reducer';
import { SubCategoryEffect } from './store/sub-category/subCategory.effects';
import { productsReducer } from './store/products/products.reducers';
import { ProductsEffects } from './store/products/products.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([baseUrlInterceptor, jwtInterceptor, errorInterceptor])),
    provideStore({ category: categoryReducer, subCategory: subCategoryReducer, product: productsReducer}),
    provideEffects([CategoryEffects, SubCategoryEffect, ProductsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
