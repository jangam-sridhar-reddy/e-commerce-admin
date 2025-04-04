import { AfterContentInit,  ChangeDetectorRef, Component, Injector, Input } from '@angular/core';
import { BaseControlValueAccessor } from '../baseControlValueAccessor';
import { FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-input-select-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    
  ],
  templateUrl: './input-select-form.component.html',
  styleUrl: './input-select-form.component.scss',
  providers :[
    {
      provide : NG_VALUE_ACCESSOR,
      useExisting: InputSelectFormComponent,
      multi: true
    }
  ]
})
export class InputSelectFormComponent extends BaseControlValueAccessor<string> implements AfterContentInit{
  @Input() label = '';
  @Input() options!: {value:string, viewValue:string, id:string}[];
  control!:FormControl
  constructor(private injector : Injector, private cdf : ChangeDetectorRef){
    super()
  }
  
  ngAfterContentInit(): void {
    const ngControl:NgControl = this.injector.get(NgControl, null) as NgControl
    if(ngControl){
      this.control = ngControl.control as FormControl
    }
    this.cdf.detectChanges()
  }

  public get invalid(): boolean | null {
    return this.control ? this.control?.invalid : false;
  }

  public get showError(): boolean | null {
    if(!this.control){
      return false
    }

    const {dirty, touched} = this.control;

    return this.invalid ? dirty || touched : false;

  }
   
  compareFn(x: any, y: any):any {
    if (x && y) {
      return x && y ? x.toString() === y.toString() : x.value.toString() === y.value.toString();
    }
  }
}
