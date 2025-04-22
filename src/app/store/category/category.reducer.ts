import { createReducer, on } from "@ngrx/store";
import { Category } from "./category.model";
import * as categoryActions from "./category.actions";


export const categoryFeatureKey = 'category';

export interface CategoryState  {
    categories : Category[],
    selectedCategory: Category | null,
    loading: boolean,
    error: any | null
}


export const initialCategory:CategoryState  = {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null
}


export const categoryReducer = createReducer(
    initialCategory,

    on(categoryActions.addCategory, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),

    on(categoryActions.addCategorySuccess, (state, {category}) => {
        return {
            ...state,
            categories: [...state.categories, category],
            loading: false,
            error: null
        }
    }),

    on(categoryActions.addCategoryFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error:error
    })),

    on(categoryActions.loadCategories, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(categoryActions.loadCategoriesSuccess, (state, {categories}) => {
       return {
            ...state,
            categories,
            loading: false
            }
    }),

    on(categoryActions.loadCategoriesFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),

    on(categoryActions.loadCategory, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),

    on(categoryActions.loadCategorySuccess, (state, {category}) => {
        return {
            ...state,
            selectedCategory: category,
            loading: false,
            error: null
        }
    }),

    on(categoryActions.loadCategoryFailure, (state, {error}) => {
        return {
            ...state,
            error: error
        }
    }),
     on(categoryActions.updateCategory, (state)=> {
        return {
            ...state,
            loading:true,
            error:null
        }
     }),

    on(categoryActions.updateCategorySuccess, (state, {category}) => {
        return {
            ...state,
            categories: state.categories.map((c) => {
                return c.category_id === category.category_id ? category : c
            }),
            selectedCategory: state.selectedCategory.category_id === category.category_id ? category : state.selectedCategory,
            loading: false,
            error: null
        }
    }),
    on(categoryActions.updateCategoryFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    }),

    on(categoryActions.deleteCategory, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),
    on(categoryActions.deleteCategorySuccess, (state, {category_id}) => {
        return {
            ...state,
            categories: state.categories.filter((c) => {
                return c.category_id !== category_id
            }),
            selectedCategory: state.selectedCategory?.category_id !== category_id 
            ? state.selectedCategory 
            : null,
            loading: false,
            error: null
        }
    }),
    on(categoryActions.deleteCategoryFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    })




)