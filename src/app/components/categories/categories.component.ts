import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { LookupService } from '../../services/lookup/lookup.service';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllCategories, selectCategoryFailure, selectCategoryLoading } from '../../store/category/category.selectors';
import { CommonModule } from '@angular/common';
import { deleteCategory, loadCategories } from '../../store/category/category.actions';

@Component({
  selector: 'app-categories',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'viewValue', 'Actions'];
   
  dataSource = new MatTableDataSource();

  store = inject(Store)

  allCategories$ = this.store.select(selectAllCategories)
  categoryLoading$ = this.store.select(selectCategoryLoading)
  categoryFailure$ = this.store.select(selectCategoryFailure)


  ngOnInit(): void {
    this.store.dispatch(loadCategories()); 
    this.allCategories$.pipe(
      tap((data) => {
        console.log(data)
        this.dataSource.data = data
      })
    )
    .subscribe()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCat(category_id:string){
    this.store.dispatch(deleteCategory({category_id}))
  }
}
