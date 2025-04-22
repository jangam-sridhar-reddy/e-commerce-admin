import { createReducer, on } from "@ngrx/store";
import { SubCategory } from "./subCategory.model";
import { addSubCategory, addSubCategoryFailure, addSubCategorySuccess, deleteSubCategory, deleteSubCategoryFailure, deleteSubCategorySuccess, loadSubCategories, loadSubCategoriesSuccess, loadSubCategory, loadSubCategoryFailure, loadSubCategorySuccess, updateSubCategory, updateSubCategoryFailure, updateSubCategorySuccess } from "./subCategory.actions"; 

export interface SubCategoryState {
    subCategories: SubCategory[],
    selectedSubCategory: SubCategory | null,
    loading:boolean,
    error:any|null
}

export const initialSubCategoryState:SubCategoryState= {
    subCategories: [],
    selectedSubCategory: null,
    loading: false,
    error: null
}

export const subCategoryReducer = createReducer(
    initialSubCategoryState,

    on(addSubCategory, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),

    on(addSubCategorySuccess, (state, {subCategory}) => {
        return {
            ...state,
            subCategories: [...state.subCategories, subCategory],
            loading: false,
            error: null
        }
    }),

    on(addSubCategoryFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    }),

    on(loadSubCategories, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),

    on(loadSubCategoriesSuccess, (state, {subCategories}) => {
        return {
            ...state,
            subCategories,
            loading: false,
            error: null
        }
    }),

    on(loadSubCategoryFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    }),

    on(loadSubCategory, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),

    on(loadSubCategorySuccess, (state, {subCategory}) => {
        return {
            ...state, 
            selectedSubCategory: subCategory,
            loading: false,
            error: null
        }
    }),

    on(loadSubCategoryFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    }),

    on(updateSubCategory, (state) => {
        return {
            ...state,
            loading: true,
            error:  null
        }
    }),

    on(updateSubCategorySuccess, (state, {subCategory}) => {
        return {
            ...state,
            subCategories: state.subCategories.map((sc) => {
                return sc.sub_category_id === subCategory.sub_category_id ? subCategory : sc
            }),
            selectedSubCategory: state.selectedSubCategory.sub_category_id === subCategory.sub_category_id ? subCategory : null,
            loading: false,
            error: null
        }
    }),

    on(updateSubCategoryFailure, (state) => {
        return {
            ...state,
            loading: false,
            error: null
        }
    }),

    on(deleteSubCategory, (state) => {
        return {
            ...state,
            loading: false,
            error: null
        }
    }),

    on(deleteSubCategorySuccess, (state, {sub_category_id}) => {
        return {
            ...state,
            subCategories: state.subCategories.filter((sc) => {
                return sc.sub_category_id !== sub_category_id 
            }),
            selectedSubCategory: state.selectedSubCategory.sub_category_id !== sub_category_id ? state.selectedSubCategory : null,
            loading: false,
            error: null
        }
    }),

    on(deleteSubCategoryFailure, (state, {error}) => {
        return {
            ...state,
            loading: false,
            error: error
        }
    })
)