import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../../services/products/products.service";
import { addProduct, addProductFailure, addProductSuccess, deleteProduct, deleteProductFailure, deleteProductSuccess, loadProduct, loadProductFailure, loadProducts, loadProductsFailure, loadProductsSuccess, loadProductSuccess, updateProduct, updateProductFailure, updateProductSuccess } from "./products.actions";
import { catchError, map, mergeMap, of } from "rxjs";

Injectable()
export class ProductsEffects{
    actions$:Actions =  inject(Actions)
    productsService:ProductsService = inject(ProductsService)

    addProduct$ = createEffect(() => this.addProductEffect())

    loadProducts$ = createEffect(() => this.loadProductsEffect())

    loadProduct$ = createEffect(() => this.loadProductEffect())

    updateProduct$ = createEffect(() => this.updateProductEffect())

    deleteProduct$ = createEffect(() => this.deleteProductEffect())

    private addProductEffect() {
        return this.actions$.pipe(
            ofType(addProduct),
            mergeMap(({productBody}) => {
                return this.productsService.addProduct(productBody).pipe(
                    map((product) => {
                        return addProductSuccess({product})
                    }),
                    catchError((error) => of(addProductFailure({error})))
                )
            })
        )
    }

    private loadProductsEffect() {
        return this.actions$.pipe(
            ofType(loadProducts),
            mergeMap(() => {
                return this.productsService.getProducts().pipe(
                    map((products) => {
                        return loadProductsSuccess({products})
                    }),
                    catchError((error) => of(loadProductsFailure({error})))
                )
            })
        )
    }

    private loadProductEffect() {
        return this.actions$.pipe(
            ofType(loadProduct),
            mergeMap(({product_id}) => {
                console.log(`effect ${product_id}`)
                return this.productsService.getProductsById(product_id).pipe(
                    map((product) => loadProductSuccess({product})),
                    catchError((error) => of(loadProductFailure({error})))
                )
            }) 
        )
    }

    private updateProductEffect() {
        return this.actions$.pipe(
            ofType(updateProduct),
            mergeMap(({product_id, productBody}) => {
                return this.productsService.updateProduct(product_id, productBody).pipe(
                    map((product) => {
                        return updateProductSuccess({product})
                    }),
                    catchError((error) => of(updateProductFailure({error})))
                )
            })
        )
    }

    private deleteProductEffect(){
        return this.actions$.pipe(
            ofType(deleteProduct),
            mergeMap(({product_id}) => {
                return this.productsService.deleteProduct(product_id).pipe(
                    map(() => {
                        return deleteProductSuccess({product_id})
                    }),
                    catchError((error) => of(deleteProductFailure({error})))
                )
            })
        )
    }
}