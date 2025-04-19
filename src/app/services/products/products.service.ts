import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseApiService {

  getProducts():Observable<any>{
    return this.http.get('product/get-products')
  } 

  getProductsById(ID:number):Observable<any>{
    return this.http.get(`product/get-product/${ID}`)
  }

  addProduct(req):Observable<any>{
    return this.http.post('product/add', req)
  }

  updateProduct(ID:number, req):Observable<any>{
    return this.http.put(`product/update/${ID}`, req)
  }

  deleteProduct(ID:number):Observable<any>{
    return this.http.delete(`product/delete/${ID}`)
  }
}
