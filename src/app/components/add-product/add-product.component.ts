import { Component, OnInit, Input, inject } from '@angular/core';
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
import { combineLatest, map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../../store/category/category.selectors';
import { selectAllSubCategories } from '../../store/sub-category/subCategory.selectors';
import { selectAllProducts, selectProduct } from '../../store/products/product.selectors';
import { loadCategories } from '../../store/category/category.actions';
import { loadSubCategories } from '../../store/sub-category/subCategory.actions';
import { addProduct, loadProduct, updateProduct } from '../../store/products/products.actions';

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

  store:Store = inject(Store)

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

  imageFile:File | null = null;

  @Input() product_id:string = '';

  category$ = this.store.select(selectAllCategories)
  subCategory$ = this.store.select(selectAllSubCategories)
  product$ = this.store.select(selectProduct)

  constructor( private fb: FormBuilder) {}

  onFileChange($event) {
    let file = $event.target.files[0]; // <--- File Object for future use.
    if(file){
      this.imageFile = file;
      this.productForm.patchValue({image: file}); // <-- Set Value for Validation
      this.productForm.get('image')?.updateValueAndValidity();
    }
    console.log(this.productForm.controls['image'].value)
  }
  ngOnInit(): void {
    
    this.productForm = this.fb.group({
      category_id: this.fb.control(null, Validators.required),
      sub_category_id: this.fb.control(null, Validators.required),
      productName: this.fb.control(null, Validators.required),
      stock_id: this.fb.control(null, Validators.required),
      image: this.fb.control(null, Validators.required),
      product_price: this.fb.control(null, Validators.required),
    }); 

    this.store.dispatch(loadCategories())
    this.store.dispatch(loadSubCategories())

    if (this.product_id) {
      this.pageTitle = 'Edit Product';
      this.edit = true;
      this.store.dispatch(loadProduct({product_id: this.product_id}))

      combineLatest([this.category$, this.subCategory$, this.product$])
      .pipe(
         
        tap(([category, subCategory, product]) => {

         const categoryItem = category?.filter((item) => {
            return item?.ID === product?.category_id
          })
          const subCategoryItem = subCategory?.filter((item) => {
            return item?.ID === product?.sub_category_id
          })

          const stockItem = this.stockStatus?.filter((item) => {
            return item?.ID === product?.stock_id
          })
          this.productForm.patchValue({
            category_id: categoryItem[0],
            stock_id: stockItem[0],
            sub_category_id: subCategoryItem[0],
            product_price: product?.product_price,
            productName: product?.productName,
            image: product?.productName
          })
          console.log(this.productForm.value) 
        })
      )
      .subscribe()
    }
  }

  get productFile() {
    return this.productForm.get('image');
  }
  submit(){ 
    if(!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return 
    }

    const formData = new FormData();
    formData.append("category_id", this.productForm.get('category_id').value?.ID)
    formData.append("sub_category_id", this.productForm.get('sub_category_id').value?.ID)
    formData.append("productName", this.productForm.get('productName').value)
    formData.append("stock_id", this.productForm.get('stock_id').value?.ID)
    if(this.imageFile){
      formData.append("image", this.imageFile)
    }
    formData.append("product_price", this.productForm.get('product_price').value)
     

    if (this.product_id) {
      this.store.dispatch(updateProduct({product_id: this.product_id, productBody: formData}))
      return
    }

    this.store.dispatch(addProduct({productBody: formData}))

    
  }
}
