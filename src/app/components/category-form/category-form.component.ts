import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextFormComponent } from '../form/input-text-form/input-text-form.component';
import { LookupService } from '../../services/lookup/lookup.service';
import { InputSelectFormComponent } from '../form/input-select-form/input-select-form.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, InputTextFormComponent, InputSelectFormComponent],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup = Object.create(null);
  pageTitle: string = 'Add Category';

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

  constructor( private fb: FormBuilder, private lookupServices: LookupService) {}

  @Input() id:string = '';

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      cName: this.fb.control(null, Validators.required),
      is_active: this.fb.control(null, Validators.required),
    });

    if (this.id) {
      this.pageTitle = 'Edit Category';
      this.edit = true;
      this.lookupServices.getCategory(Number(this.id))
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
    
    if(this.id){
      const categoryId = this.id
      this.lookupServices.updateCategory(Number(categoryId),  body)
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

    this.lookupServices.addCategory(body)
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


    console.log(this.categoryForm)
  }
}
