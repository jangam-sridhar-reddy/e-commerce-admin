import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SubCategoryState } from "./subCategory.reducer";

export const selectSubCategoryState = createFeatureSelector<SubCategoryState>('subCategory') 

export const selectAllSubCategories = createSelector(
    selectSubCategoryState,
    (state) => state.subCategories
)

export const selectSubCategoryLoading = createSelector(
    selectSubCategoryState,
    (state) => state.loading
)

export const electSubCategoryFailure = createSelector(
    selectSubCategoryState,
    (state) => state.error
)

export const selectSubCategory = createSelector(
    selectSubCategoryState,
    (state) => state.selectedSubCategory
)

 
