import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';
import { InputSelectFormComponent } from '../form/input-select-form/input-select-form.component';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSubCategory } from '../../store/sub-category/subCategory.selectors';
import { addSubCategory, loadSubCategory, updateSubCategory } from '../../store/sub-category/subCategory.actions';

@Component({
  selector: 'app-sub-category-form',
  imports: [ReactiveFormsModule, InputTextFormComponent, InputSelectFormComponent],
  templateUrl: './sub-category-form.component.html',
  styleUrl: './sub-category-form.component.css'
})
export class SubCategoryFormComponent {
  public subCategoryForm: FormGroup = Object.create(null);
  store:Store = inject(Store);
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

  @Input() sub_category_id:string = '';

  getSubCategory$ = this.store.select(selectSubCategory)

  constructor( private fb: FormBuilder) {}


  ngOnInit(): void {
    this.subCategoryForm = this.fb.group({
      subCname: this.fb.control(null, Validators.required),
      is_active: this.fb.control(null, Validators.required),

    });

    if (this.sub_category_id) {
      this.pageTitle = 'Edit Sub Category';
      this.edit = true;
      this.store.dispatch(loadSubCategory({sub_category_id: this.sub_category_id}))
      this.getSubCategory$
            .pipe(
        tap((res:any) => {
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
    if(this.sub_category_id){ 
      this.store.dispatch(updateSubCategory({sub_category_id: this.sub_category_id,  subCategoryBody: body}))
      return
    }

    this.store.dispatch(addSubCategory({   subCategoryBody: body}))
      

    console.log(this.subCategoryForm)
  }
}
