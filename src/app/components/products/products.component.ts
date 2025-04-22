import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router'; 
import { Store } from '@ngrx/store';
import { deleteProduct, loadProducts } from '../../store/products/products.actions';
import { selectAllProducts } from '../../store/products/product.selectors';
@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
   
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

  store:Store = inject(Store);
  selectAllProdcuts$ = this.store.select(selectAllProducts)
  dataSource = new MatTableDataSource( );

  ngOnInit(): void {
    this.store.dispatch(loadProducts())
    this.selectAllProdcuts$
    .subscribe({
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

  deleteProd(product_id:string){
    this.store.dispatch(deleteProduct({product_id}))
  }
}
