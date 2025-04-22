import { createAction, props } from "@ngrx/store";
import { CreateProduct, Product } from "./products.model";

export const addProduct = createAction(
    '[Product] add product',
    props<{productBody: FormData}>()
)

export const addProductSuccess = createAction(
    '[Product] add product success',
    props<{product:Product}>()
)

export const addProductFailure = createAction(
    '[Product] add product failure',
    props<{error: any}>()
)

export const loadProducts = createAction(
    '[Product] load products'
)

export const loadProductsSuccess = createAction(
    '[Product] load products success',
    props<{products: Product[]}>()
)

export const loadProductsFailure = createAction(
    '[Product] load products failure',
    props<{error:any}>()
)

export const loadProduct = createAction(
    '[Product] load product',
    props<{product_id: string}>()
)

export const loadProductSuccess = createAction(
    '[Product] load product success',
    props<{product:Product}>()
)

export const loadProductFailure = createAction(
    '[Product] load product failure',
    props<{error: any}>()
)

export const updateProduct = createAction(
    '[Product] update product',
    props<{product_id: string, productBody: FormData}>()
)

export const updateProductSuccess = createAction(
    '[Product] update product success',
    props<{product: Product}>()
)

export const updateProductFailure = createAction(
    '[Product] update product failure',
    props<{error:any}>()
)

export const deleteProduct = createAction(
    '[Product] delete product',
    props<{product_id: string,}>()
)

export const deleteProductSuccess = createAction(
    '[Product] delete product success',
    props<{product_id: string,}>()
)

export const deleteProductFailure = createAction(
    '[Product] delete product failure',
    props<{error:any}>()
)