import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { LookupService } from '../../services/lookup/lookup.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sub-category',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'subCname', 'is_active',  'Actions'];
   
  dataSource = new MatTableDataSource();

  constructor(private lookupService: LookupService){}

  ngOnInit(): void {
    this.lookupService.getSubCategories()
    .pipe(
      tap((res) => {
        if(res){
          console.log(res)
          this.dataSource.data = res
        }
      })
    )
    .subscribe({
      next: () => {},
      error: (e) => {
        console.log(e)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSubCategory(ID:number){
    this.lookupService.deleteSubCategory(ID)
    .subscribe({
      next:(res) => {
        console.log(res)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
}
