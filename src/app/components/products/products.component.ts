import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Name', 'Price', 'Actions'];
  element_data = [
    { ID: 1, Name: 'Bottle', Price: '10' },
    { ID: 2, Name: 'spoon', Price: '2' },
    { ID: 3, Name: 'Hammer', Price: '50' },
    { ID: 4, Name: 'Screw Driver', Price: '12' },
  ];
  dataSource = new MatTableDataSource(this.element_data);
  ngOnInit(): void {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
