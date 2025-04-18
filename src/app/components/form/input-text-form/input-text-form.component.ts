import { AfterContentInit, Component, Injector, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BaseControlValueAccessor } from '../baseControlValueAccessor';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-input-text-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-text-form.component.html',
  styleUrl: './input-text-form.component.css',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputTextFormComponent,
      multi:true
    }
  ]
})
export class InputTextFormComponent extends BaseControlValueAccessor<string> implements AfterContentInit {
  @Input() label!:string;
  @Input() type:string = 'text' 
  control!:FormControl;

  constructor(private injector: Injector, private cdf : ChangeDetectorRef){super()}


  ngAfterContentInit(): void {
    const ngControl:NgControl = this.injector.get(NgControl, null) as NgControl;;
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
  
}
