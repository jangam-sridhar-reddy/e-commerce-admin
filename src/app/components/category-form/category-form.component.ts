import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, InputTextFormComponent],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup = Object.create(null);
  pageTitle: string = 'Add Category';
  
  edit: boolean = false;

  constructor( private fb: FormBuilder) {}

  @Input() id:string = '';

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: this.fb.control(null, Validators.required),
    });

    if (this.id) {
      this.pageTitle = 'Edit Category';
      this.edit = true;
    }
  }

  submit(){
    console.log(this.categoryForm)
    if(!this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched();
      return 
    }

    console.log(this.categoryForm)
  }
}
