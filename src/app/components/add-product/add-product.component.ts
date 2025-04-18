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
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit { 
  public productForm: FormGroup = Object.create(null);
  pageTitle: string = 'Add Product';
  selectOptions: {value:string, viewValue:string, id:string}[] = [
    {value: 'steak-0', viewValue: 'Steak', id : '1'},
    {value: 'pizza-1', viewValue: 'Pizza', id : '2'},
    {value: 'tacos-2', viewValue: 'Tacos', id : '3'},
  ]
  edit: boolean = false;

  constructor( private fb: FormBuilder) {}

  @Input() id:string = '';

  onFileChange($event) {
    let file = $event.target.files[0]; // <--- File Object for future use.
      this.productForm.controls['productFile'].setValue(file ? file.name : ''); // <-- Set Value for Validation
  }
  fileName = '';
  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryName: this.fb.control(null, Validators.required),
      subCategoryName: this.fb.control(null, Validators.required),
      productName: this.fb.control(null, Validators.required),
      stock: this.fb.control(null, Validators.required),
      productFile: this.fb.control(this.fileName, Validators.required),
      productPrice: this.fb.control(null, Validators.required),
    }); 
    if (this.id) {
      this.pageTitle = 'Edit Product';
      this.edit = true;
    }
  }

  get productFile() {
    return this.productForm.get('productFile');
  }
  submit(){
    console.log(this.productForm)
    if(!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return 
    }

    console.log(this.productForm)
  }
}
