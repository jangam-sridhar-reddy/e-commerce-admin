import { Routes } from "@angular/router";
import { SubCategoryComponent } from "./sub-category.component";
import { SubCategoryFormComponent } from "../sub-category-form/sub-category-form.component";


export const subCategoryRoutes: Routes = [
    {
        path : '',
        component: SubCategoryComponent
    },
    {
        path : 'add-sub-category',
        component : SubCategoryFormComponent
    },
    {
        path : 'edit-sub-category/:id',
        component : SubCategoryFormComponent
    }
]