import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiURL = environment.apiURL
  const newReq = req.clone({
    url: `${apiURL}/api/${req.url}`
  })
  return next(newReq);
};
