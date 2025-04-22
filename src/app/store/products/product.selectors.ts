import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducers";

export const selectProductState = createFeatureSelector<ProductsState>('product')

export const selectAllProducts = createSelector(
    selectProductState,
    (state) => state.products
)

export const selectProductLoading = createSelector(
    selectProductState,
    (state) => state.loading
)

export const selectProductError = createSelector(
    selectProductState,
    (state) => state.error
)

export const selectProduct = createSelector(
    selectProductState,
    (state) => state.selectedProduct
)