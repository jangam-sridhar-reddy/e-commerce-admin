import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { LookupService } from '../../services/lookup/lookup.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'viewValue', 'Actions'];
   
  dataSource = new MatTableDataSource();

  constructor(private lookupService:LookupService){}

  ngOnInit(): void {
    this.lookupService.getCategories()
    .pipe(
      tap((res) => {
        if(res){
          console.log(res)
          this.dataSource.data = res
        }
      })
    )
    .subscribe(
      {
        next: () => {},
        error: (e) => {console.log(e)}
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCategory(categoryId:number){
    this.lookupService.deleteCategory(categoryId)
    .pipe(
      tap((res) => {
        if(res){
          console.log(res)
        }
      })
    )
    .subscribe(
      {
        next: () => {},
        error: (e) => {console.log(e)}
      }
    )
  }
}
