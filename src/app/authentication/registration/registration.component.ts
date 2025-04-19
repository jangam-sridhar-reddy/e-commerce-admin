import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextFormComponent } from '../../components/form/input-text-form/input-text-form.component';
import { AuthService } from '../../services/auth/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule, InputTextFormComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  signUpForm:FormGroup = Object.create(null)

  constructor(private fb: FormBuilder, private auth:AuthService, private router:Router){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: this.fb.control(null, Validators.required),
      lastName: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      hashPassword: this.fb.control(null, Validators.required),
      roleId: this.fb.control(1, Validators.required)
    })
  }

  submit(){
    if(!this.signUpForm.valid){
      this.signUpForm.markAllAsTouched()
      this.signUpForm.markAsDirty()
      return
    }
    
    this.auth.registration(this.signUpForm.value)
    .pipe(tap(response => { console.log(response)}))
    .subscribe({
      next:(response)=>{
        if(response){
          this.router.navigateByUrl('/authentication/login')
        }
      },
      error:(error) =>{console.log(error)}
    }) 

  }

}
