import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LookupService } from "../../services/lookup/lookup.service";
import { addSubCategory, addSubCategoryFailure, addSubCategorySuccess, deleteSubCategory,  deleteSubCategoryFailure,  deleteSubCategorySuccess,  loadSubCategories, loadSubCategoriesSuccess, loadSubCategory, loadSubCategoryFailure, loadSubCategorySuccess, updateSubCategory, updateSubCategoryFailure, updateSubCategorySuccess } from "./subCategory.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { loadCategoriesFailure } from "../category/category.actions";

@Injectable()
export class SubCategoryEffect {
    actions$ = inject(Actions)
    subCategoryService = inject(LookupService)

    addSubCategory$ = createEffect(() => this.addSubCategoryEffect())

    loadSubCategories$ = createEffect(() => this.loadSubCategoriesEffect())

    loadSubCategory$ = createEffect(() => this.loadSubCategoryEffect())

    updateSubCategory$ = createEffect(() => this.updateSubCategoryEffect())

    deleteSubCategory$ = createEffect(() => this.deleteSubCategoryEffect())

    private addSubCategoryEffect() {
        return this.actions$.pipe(
            ofType(addSubCategory),
            mergeMap(({subCategoryBody}) => {
                return this.subCategoryService.addSubCategory(subCategoryBody).pipe(
                    map((subCategory) => {
                        return addSubCategorySuccess({subCategory})
                    }),
                    catchError((error) => of(addSubCategoryFailure({error})))
                )
            })
        )
    }

    private loadSubCategoriesEffect(){
        return this.actions$.pipe(
            ofType(loadSubCategories),
            mergeMap(() => {
                return this.subCategoryService.getSubCategories().pipe(
                    map((subCategories) => {
                        return loadSubCategoriesSuccess({subCategories})
                    }),
                    catchError((error) => of(loadCategoriesFailure({error})))
                )
            })
        )
    }
    
    private loadSubCategoryEffect() {
        return this.actions$.pipe(
            ofType(loadSubCategory),
            mergeMap(({sub_category_id}) => {
                return this.subCategoryService.getCategory(sub_category_id).pipe(
                    map((subCategory) => loadSubCategorySuccess( {subCategory: subCategory})),
                    catchError((error) => of(loadSubCategoryFailure({error})))
                )
            })
        )
    }

    private updateSubCategoryEffect() {
        return this.actions$.pipe(
            ofType(updateSubCategory),
            mergeMap(({sub_category_id, subCategoryBody}) => {
                return this.subCategoryService.updateSubCategory(sub_category_id, subCategoryBody).pipe(
                    map((subCategory) => {
                        return updateSubCategorySuccess({subCategory})
                    }),
                    catchError((error) => of(updateSubCategoryFailure({error})))
                )
            })
        )
    }

    private deleteSubCategoryEffect(){
        return this.actions$.pipe(
            ofType(deleteSubCategory),
            mergeMap(({sub_category_id}) => {
                return this.subCategoryService.deleteSubCategory(sub_category_id).pipe(
                    map(() => deleteSubCategorySuccess({sub_category_id})),
                    catchError((error)  => of(deleteSubCategoryFailure({error})))
                )
            })
        )
    }

}
