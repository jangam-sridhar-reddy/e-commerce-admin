import { createAction, props } from "@ngrx/store";
import { CreateSubCategory, SubCategory } from "./subCategory.model";

export const addSubCategory = createAction(
    '[SubCategory] add sub category',
    props<{subCategoryBody: CreateSubCategory}>()
)

export const addSubCategorySuccess = createAction(
    '[SubCategory] add sub category success',
    props<{subCategory:SubCategory}>()
)

export const addSubCategoryFailure = createAction(
    '[SubCategory] add sub category failure',
    props<{error: any}>()
)

export const loadSubCategories = createAction(
    '[SubCategory] load sub categories'
)

export const loadSubCategoriesSuccess = createAction(
    '[SubCategory] load sub categories success',
    props<{subCategories: SubCategory[]}>()
)

export const loadSubCategoriesFailure = createAction(
    '[SubCategory] load sub category failure',
    props<{error:any}>()
)

export const loadSubCategory = createAction(
    '[SubCategory] load sub category',
    props<{sub_category_id: string}>()
)

export const loadSubCategorySuccess = createAction(
    '[SubCategory] load sub category success',
    props<{subCategory: SubCategory}>()
)

export const loadSubCategoryFailure = createAction(
    '[SubCategory] load sub category failure',
    props<{error:any}>()
)

export const updateSubCategory = createAction(
    '[SubCategory] update sub category',
    props<{sub_category_id: string, subCategoryBody: CreateSubCategory}>()
)

export const updateSubCategorySuccess = createAction(
    '[SubCategory] update sub category success',
    props<{subCategory:SubCategory}>()
)

export const updateSubCategoryFailure = createAction(
    '[SubCategory] update sub category failure',
    props<{error: any}>()
)

export const deleteSubCategory = createAction(
    '[SubCategory] delete sub category',
    props<{sub_category_id: string}>()
)

export const deleteSubCategorySuccess = createAction(
    '[Subcategory] delete sub catgeory success',
    props<{sub_category_id: string}>()
)

export const deleteSubCategoryFailure = createAction(
    '[SubCategory] delete sub category failure',
    props<{error: any}>()
)