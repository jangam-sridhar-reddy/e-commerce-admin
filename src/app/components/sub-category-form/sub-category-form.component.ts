import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';
import { InputSelectFormComponent } from '../form/input-select-form/input-select-form.component';
import { LookupService } from '../../services/lookup/lookup.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sub-category-form',
  imports: [ReactiveFormsModule, InputTextFormComponent, InputSelectFormComponent],
  templateUrl: './sub-category-form.component.html',
  styleUrl: './sub-category-form.component.css'
})
export class SubCategoryFormComponent {
  public subCategoryForm: FormGroup = Object.create(null);
  subCategoryStatus  = [
    {
      ID: 1,
      value:'true', 
      viewValue:'true', 
      id:'1'
    },
    {
      ID: 2,
      value:'false', 
      viewValue:'false', 
      id:'2'
    },

  ]
  pageTitle: string = 'Add Sub Category';
  
  edit: boolean = false;

  constructor( private fb: FormBuilder, private lookupServices: LookupService) {}

  @Input() id:string = '';

  ngOnInit(): void {
    this.subCategoryForm = this.fb.group({
      subCname: this.fb.control(null, Validators.required),
      is_active: this.fb.control(null, Validators.required),

    });

    if (this.id) {
      this.pageTitle = 'Edit Sub Category';
      this.edit = true;
      this.lookupServices.getSubCategory(Number(this.id))
            .pipe(
        tap((res) => {
          if(res){
            console.log(res)
            this.subCategoryForm.patchValue({
              subCname: res.subCname,
              is_active: res.is_active ? this.subCategoryStatus[0] :  this.subCategoryStatus[1]
            })
            console.log(this.subCategoryForm.value)
          }
        })
        
      )
      .subscribe({
        next: () => {},
        error: (e) => {console.log(e)}
      })
    }
  }

  submit(){
    console.log(this.subCategoryForm)
    if(!this.subCategoryForm.valid) {
      this.subCategoryForm.markAllAsTouched();
      return 
    }
    const statusObj = this.subCategoryForm.get('is_active').value

    const body = {
      subCname :  this.subCategoryForm.get('subCname').value,
      is_active: statusObj?.value === 'true' ? true : false
    }
    if(this.id){
      const ID = Number(this.id)
      this.lookupServices.updateSubCategory(Number(ID),  body)
      .pipe(
        tap((res) => {
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
      return
    }

    this.lookupServices.addSubCategory(body)
      .pipe(
        tap((res) => {
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

    console.log(this.subCategoryForm)
  }
}
