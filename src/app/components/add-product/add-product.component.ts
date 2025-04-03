import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup, 
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';

@Component({
  selector: 'app-add-product',
  standalone:true,
  imports: [ 
    ReactiveFormsModule,
    InputTextFormComponent
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit { 
  public productForm: FormGroup = Object.create(null);
  pageTitle: string = 'Add Product';
  
  edit: boolean = false;

  constructor( private fb: FormBuilder) {}

  @Input() id:string = '';

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: this.fb.control(null, Validators.required),
      productPrice: this.fb.control(null, Validators.required),
    });

    if (this.id) {
      this.pageTitle = 'Edit Product';
      this.edit = true;
    }
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
