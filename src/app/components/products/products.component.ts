import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Name', 'cName', 'subCategoryName', 'stock', 'image',  'Price', 'Actions'];
  element_data = [
    { ID: 1, Name: 'Bottle', cName: 'Beauty', subCategoryName: 'soaps', stock: 'available', image: '',   Price: '10' },
    { ID: 2, Name: 'spoon', cName: 'Beauty', subCategoryName: 'soaps', stock: 'available', image: '', Price: '2' },
    { ID: 3, Name: 'Hammer', cName: 'Beauty', subCategoryName: 'soaps', stock: 'available', image: '', Price: '50' },
    { ID: 4, Name: 'Screw Driver', cName: 'Beauty', subCategoryName: 'soaps', stock: 'available', image: '', Price: '12' },
  ];
  dataSource = new MatTableDataSource(this.element_data);
  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
