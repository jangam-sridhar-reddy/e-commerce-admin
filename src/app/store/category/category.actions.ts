import { createAction, props } from "@ngrx/store";
import { Category, CreateCategory } from "./category.model";

export const addCategory = createAction(
    '[Category] add category',
    props<{categoryBody: CreateCategory}>()
)

export const addCategorySuccess = createAction(
    '[Category] add category success',
    props<{category: Category}>()
)

export const addCategoryFailure =  createAction(
    '[Category] add category failure',
    props<{error:any}>()
)

export const loadCategories = createAction('[Category] load categories');

export const loadCategoriesSuccess = createAction(
    '[Category] load categories Success',
    props<{categories: Category[]}>()
);

export const loadCategoriesFailure = createAction(
    '[Category] load categories Failure',
    props<{error: any}>()
)


export const loadCategory = createAction(
    '[Category] load category',
    props<{category_id:string}>()
)

export const loadCategorySuccess = createAction(
    '[Category] load category Success',
    props<{category: Category}>()

)

export const loadCategoryFailure = createAction(
    '[Category] load category Failure',
    props<{error:any}>()

)

export const updateCategory = createAction(
    '[Category] update category',
    props<{category_id:string, categoryBody: CreateCategory}>()
)


export const updateCategorySuccess = createAction(
    '[Category] update category success',
    props<{category: Category}>()
)

export const updateCategoryFailure = createAction(
    '[Category] update category failure',
    props<{error:any }>()
)

export const deleteCategory = createAction(
    '[Category] delete category',
    props<{category_id: string}>()
)

export const deleteCategorySuccess = createAction(
    '[Category] delete category success',
    props<{ category_id: string }>()
)

export const deleteCategoryFailure = createAction(
    '[Category] delete category failure',
    props<{error:any}>()
)




