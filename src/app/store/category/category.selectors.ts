import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.reducer";

export const selectCategoryState = createFeatureSelector<CategoryState>('category');


export const selectAllCategories = createSelector(
    selectCategoryState,
    (state) => state.categories
)

export const selectCategoryLoading = createSelector(
    selectCategoryState,
    (state) => state.loading
)

export const selectCategoryFailure = createSelector(
    selectCategoryState,
    (state) => state.error
)

export const selectCategory = createSelector(
    selectCategoryState,
    (state) => state.selectedCategory
)
 
