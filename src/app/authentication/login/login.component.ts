import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextFormComponent } from '../../components/form/input-text-form/input-text-form.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { switchMap, tap } from 'rxjs'; 

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextFormComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup = Object.create(null)

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : this.fb.control(null, [Validators.required, Validators.email]),
      hashPassword : this.fb.control(null, Validators.required),
    })
  }

  submit(){
    if(!this.loginForm.valid){
      this.loginForm.markAsDirty()
      this.loginForm.markAllAsTouched()
      return
    }



    this.auth.login(this.loginForm.value)
    .pipe(
      tap(res=> {
        if(res){
          localStorage.setItem('token', res.access_token)
        }
      }),
      switchMap(()=> this.auth.getAdminUser()),
      switchMap(()=> this.auth.isLoggedIn()),
      tap((loggedIn)=> { 
        if(loggedIn){
          this.router.navigateByUrl('/products', { replaceUrl: true })
        }
      })
    )
    .subscribe(
      {
        next:()=>{},
        error:(err) => {
          console.log(err)
          console.log(err?.error?.detail)
        }
      }
    )
    
  }
}
