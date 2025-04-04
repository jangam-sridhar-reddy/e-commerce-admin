import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';
import { InputSelectFormComponent } from '../form/input-select-form/input-select-form.component';

@Component({
  selector: 'app-sub-category-form',
  imports: [ReactiveFormsModule, InputTextFormComponent, InputSelectFormComponent],
  templateUrl: './sub-category-form.component.html',
  styleUrl: './sub-category-form.component.scss'
})
export class SubCategoryFormComponent {
  public subCategoryForm: FormGroup = Object.create(null);
  selectOptions: {value:string, viewValue:string, id:string}[] = [
    {value: 'steak-0', viewValue: 'Steak', id : '1'},
    {value: 'pizza-1', viewValue: 'Pizza', id : '2'},
    {value: 'tacos-2', viewValue: 'Tacos', id : '3'},
  ]
  pageTitle: string = 'Add Sub Category';
  
  edit: boolean = false;

  constructor( private fb: FormBuilder) {}

  @Input() id:string = '';

  ngOnInit(): void {
    this.subCategoryForm = this.fb.group({
      categoryName: this.fb.control(null, Validators.required),
      subCategoryName: this.fb.control(null, Validators.required),

    });

    if (this.id) {
      this.pageTitle = 'Edit Sub Category';
      this.edit = true;
    }
  }

  submit(){
    console.log(this.subCategoryForm)
    if(!this.subCategoryForm.valid) {
      this.subCategoryForm.markAllAsTouched();
      return 
    }

    console.log(this.subCategoryForm)
  }
}
