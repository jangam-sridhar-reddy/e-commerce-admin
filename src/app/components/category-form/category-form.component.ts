import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';
import { LookupService } from '../../services/lookup/lookup.service';
import { InputSelectFormComponent } from '../form/input-select-form/input-select-form.component';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { addCategory, loadCategory, updateCategory } from '../../store/category/category.actions';
import { selectCategory } from '../../store/category/category.selectors';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, InputTextFormComponent, InputSelectFormComponent],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup = Object.create(null);
  pageTitle: string = 'Add Category';
  private store:Store = inject(Store);

  categoryStatus  = [
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
  
  edit: boolean = false;
  @Input() category_id:string = '';

  loadCategory$ = this.store.select(selectCategory)
  constructor( private fb: FormBuilder, private lookupServices: LookupService) {}


  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      cName: this.fb.control(null, Validators.required),
      is_active: this.fb.control(null, Validators.required),
    });


    if (this.category_id) {
      this.pageTitle = 'Edit Category';
      this.edit = true;
      this.store.dispatch(loadCategory({category_id: this.category_id}))
      this.loadCategory$
      .pipe(
        tap((res) => {
          if(res){
            console.log(res)
            this.categoryForm.patchValue({
              cName: res.cName,
              is_active: res.is_active ? this.categoryStatus[0] :  this.categoryStatus[1]
            })
            console.log(this.categoryForm.value)
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
    if(!this.categoryForm.valid) {
      this.categoryForm.markAllAsTouched();
      return 
    }

    const statusObj = this.categoryForm.get('is_active').value
     
    
    const body = {
      cName :  this.categoryForm.get('cName').value,
      is_active: statusObj?.value === 'true' ? true : false
    }
    
    if(this.category_id){ 
      this.store.dispatch(updateCategory({category_id: this.category_id, categoryBody: body}))
      this.store.select(selectCategory)
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

    this.store.dispatch(addCategory({categoryBody: body}))
  
  }
}
