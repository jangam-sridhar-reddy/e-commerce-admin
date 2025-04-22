import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LookupService } from "../../services/lookup/lookup.service";
import { deleteCategorySuccess, deleteCategory, deleteCategoryFailure, loadCategories, loadCategoriesFailure, loadCategoriesSuccess, loadCategory, loadCategoryFailure, loadCategorySuccess, updateCategory, updateCategoryFailure, updateCategorySuccess, addCategory, addCategorySuccess, addCategoryFailure } from "./category.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";

@Injectable()
export class CategoryEffects {
    actions$ = inject(Actions)
    categoryService = inject(LookupService)

    addCategory$ = createEffect(() => this.addCategoryEffect())

    loadCategories$ = createEffect(() => this.loadCategoriesEffect())

    loadCategory$ = createEffect(() => this.loadCategoryEffect())

    updateCategory$ = createEffect(() => this.updateCategoryEffect())

    deleteCategory$ = createEffect(() => this.deleteCategoryEffect())

    private addCategoryEffect() {
        return this.actions$.pipe(
            ofType(addCategory),
            mergeMap(({categoryBody}) => {
                return this.categoryService.addCategory(categoryBody).pipe(
                    map((category) => {
                        return addCategorySuccess({category: category}) 
                    }),
                    catchError((error) => of(addCategoryFailure({error:error})))
                )
            })
        )
    }

    private loadCategoriesEffect() {
        return this.actions$.pipe(
            ofType(loadCategories),
            mergeMap(() => {
                console.log('categories calls')
                return this.categoryService.getCategories()
                .pipe(
                    tap((data) => console.log(data)),
                    map((categories) => loadCategoriesSuccess({categories})),
                    catchError((error) => of(loadCategoriesFailure({error: error})) )
                )
            })
        )
    }

    private loadCategoryEffect() {
        return this.actions$.pipe(
            ofType(loadCategory),
            mergeMap(({category_id}) => {
                return this.categoryService.getCategory(category_id)
                .pipe(
                    map((category) => loadCategorySuccess({category})),
                    catchError((error) => of(loadCategoryFailure({error: error})))
                )
            })
        )
    }


    private updateCategoryEffect() {
        return this.actions$.pipe(
            ofType(updateCategory),
            mergeMap(({category_id, categoryBody}) => {
                return this.categoryService.updateCategory(category_id, categoryBody).pipe(
                    map((category) => {
                        return updateCategorySuccess({category})
                    }),
                    catchError((error) => of( updateCategoryFailure({error})))
                )
            })
        )
    }

    private deleteCategoryEffect(){
        return this.actions$.pipe(
            ofType(deleteCategory),
            mergeMap(({category_id}) => {
                return this.categoryService.deleteCategory(category_id).pipe(
                    map(() => deleteCategorySuccess({category_id: category_id})),
                    catchError((error) => of(deleteCategoryFailure({error})))
                )
            })
        )
    }


}