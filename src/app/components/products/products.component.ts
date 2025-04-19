import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductsService){}
  displayedColumns: string[] = [
    'ID', 
    'productName', 
    'category_name', 
    'subCategory_name', 
    'stockStatus', 
    'imageURL',  
    'product_price', 
    'Actions'
  ];
   
  dataSource = new MatTableDataSource( );
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:(productData)=> {
        this.dataSource.data = productData
      },
      error: (e) => {console.log(e)}
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(ID:number){
    this.productService.deleteProduct(ID)
    .pipe(
      tap((res)=> {
        if(res){
          console.log(res)
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
}
