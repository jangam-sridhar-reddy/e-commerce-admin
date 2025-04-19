import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  const newReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(newReq) 
};
