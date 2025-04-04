import { Routes } from "@angular/router";
import { CategoriesComponent } from "./categories.component";
import { CategoryFormComponent } from "../category-form/category-form.component";

export const CategoryRoutes:Routes = [
    {
        path: '',
        component: CategoriesComponent
    },
    {
        path: 'add-category',
        component: CategoryFormComponent
    },
    {
        path: 'edit-category/:id',
        component:CategoryFormComponent
    }
]