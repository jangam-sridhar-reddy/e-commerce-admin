import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Name', 'cName', 'Actions'];
  element_data = [
    { ID: 1, Name: 'Bottle', cName :' Beauty' },
    { ID: 2, Name: 'spoon', cName :' Beauty' },
    { ID: 3, Name: 'Hammer', cName :' Beauty' },
    { ID: 4, Name: 'Screw Driver', cName :' Beauty' },
  ];
  dataSource = new MatTableDataSource(this.element_data);
  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
