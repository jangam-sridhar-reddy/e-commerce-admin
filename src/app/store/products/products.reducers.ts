import { createReducer, on } from "@ngrx/store";
import { Product } from "./products.model";
import { addProduct, addProductFailure, addProductSuccess, deleteProduct, deleteProductFailure, deleteProductSuccess, loadProduct, loadProductFailure, loadProducts, loadProductsFailure, loadProductsSuccess, loadProductSuccess, updateProduct, updateProductFailure, updateProductSuccess } from "./products.actions";

export interface ProductsState {
    products: Product[],
    selectedProduct: Product | null,
    loading: boolean,
    error: any | null
}

export const initialproductsState:ProductsState = {
    products: [],
    selectedProduct : null,
    loading: false,
    error: null
}

export const productsReducer = createReducer(initialproductsState,
    on(addProduct, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),

    on(addProductSuccess, (state, {product}) =>{
        return {
            ...state,
            products: [...state.products, product],
            loading: false,
            error: null
        }
    }),

    on(addProductFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    }),

    on(loadProducts, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),

    on(loadProductsSuccess, (state, {products}) => {
        return {
            ...state,
            products: products,
            loading: false,
            error: null
        }
    }),

    on(loadProductsFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    }),

    on(loadProduct, (state) => {
        return{
            ...state,
            loading: true,
            error: null
        }
    }),

    on(loadProductSuccess, (state, {product}) => {
        return {
            ...state,
            selectedProduct: product,
            loading: false,
            error: null
        }
    }),

    on(loadProductFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    }),

    on(updateProduct, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),
    
    on(updateProductSuccess, (state, {product}) => {
        return {
            ...state,
            products: state.products.map((p) => {
                return p.product_id === product.product_id ? product : p
            }),
            selectedProduct: state.selectedProduct.product_id === product.product_id ? product : state.selectedProduct,
            loading: false,
            error: null
        }
    }),

    on(updateProductFailure, (state, {error})=> {
        return {
            ...state,
            loading: false,
            error
        }
    }),

    on(deleteProduct, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),

    on(deleteProductSuccess, (state, {product_id}) => {
        return {
            ...state,
            products: state.products.filter((p) => {
                return p.product_id !== product_id
            }),
            selectedProduct: state.selectedProduct.product_id !== product_id ? state.selectedProduct : null,
            loading: false,
            error: null
        }
    }),

    on(deleteProductFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error
        }
    })
)