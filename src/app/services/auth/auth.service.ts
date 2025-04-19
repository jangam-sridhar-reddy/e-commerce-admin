import { inject, Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  router:Router = inject(Router)

  login(req: {email:string, hashPassword: string}):Observable<any>{
    return this.http.post('auth/login', req)
  }

  registration(req:{firstName:string, lastName:string, email:string, hashPassword:string, roleId: number}):Observable<any>{
    return this.http.post('auth/registration', req)
  }

  getAdminUser():Observable<any>{
    return this.http.get('auth/admin-user')
  }

  gettoken(){
    return localStorage.getItem('token')
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  isLoggedIn(): Observable<any>{
    return of(this.checkToken())
  }


  checkToken(){
    const token = this.gettoken()
    if (!token) return false;

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;

  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/authentication/login')
  }
  
}
