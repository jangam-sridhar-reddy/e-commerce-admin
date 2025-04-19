import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup, 
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';
import { InputSelectFormComponent } from '../form/input-select-form/input-select-form.component';
import { InputFileFormComponent } from '../form/input-file-form/input-file-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LookupService } from '../../services/lookup/lookup.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-add-product',
  standalone:true,
  imports: [ 
    ReactiveFormsModule,
    InputTextFormComponent, 
    InputSelectFormComponent,
    InputFileFormComponent,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit { 
  public productForm: FormGroup = Object.create(null);
  pageTitle: string = 'Add Product';
  category$: Observable<any[]>
  subCategory$: Observable<any[]>
 

  stockStatus = [
    {
      ID: 1,
      value:1,
      viewValue: 'Available'
    },
    {
      ID: 2,
      value:2,
      viewValue: 'Not Available'
    }
  ]

  edit: boolean = false;

  constructor( private fb: FormBuilder, private lookup:LookupService, private productService: ProductsService) {}

  @Input() id:string = '';

  onFileChange($event) {
    let file = $event.target.files[0]; // <--- File Object for future use.
    this.productForm.controls['image'].setValue(file); // <-- Set Value for Validation
  }
  ngOnInit(): void {
    this.category$ = this.lookup.getCategories().pipe(tap(res => console.log(res)))
    this.subCategory$ = this.lookup.getSubCategories().pipe(tap(res => console.log(res)))

    this.productForm = this.fb.group({
      category_id: this.fb.control(null, Validators.required),
      sub_category_id: this.fb.control(null, Validators.required),
      productName: this.fb.control(null, Validators.required),
      stock_id: this.fb.control(null, Validators.required),
      image: this.fb.control(null, Validators.required),
      product_price: this.fb.control(null, Validators.required),
    }); 
    if (this.id) {
      this.pageTitle = 'Edit Product';
      this.edit = true;
    }
  }

  get productFile() {
    return this.productForm.get('image');
  }
  submit(){
    console.log(this.productForm.value)
    if(!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return 
    }

    if (this.id) {
      this.productService.updateProduct(Number(this.id), this.productForm.value)
      .pipe(
        tap((req) => {
          if(req){
            console.log('Product Updated')
          }
        })
      )
      .subscribe({
        next: () => {},
        error: (e)=> {
          console.log(e)
        }
      })

      return
    }

    this.productService.addProduct(this.productForm.value)
    .pipe(
      tap((req) => {
        if(req){
          console.log('Product added')
        }
      })
    )
    .subscribe({
      next: () => {},
      error: (e)=> {
        console.log(e)
      }
    })

    

    
  }
}
