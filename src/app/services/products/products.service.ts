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

  getProductsById(product_id:string):Observable<any>{
    return this.http.get(`product/get-product/${product_id}`)
  }

  addProduct(req):Observable<any>{
    return this.http.post('product/add', req)
  }

  updateProduct(product_id:string, req):Observable<any>{
    return this.http.put(`product/update/${product_id}`, req)
  }

  deleteProduct(product_id:string):Observable<any>{
    return this.http.delete(`product/delete/${product_id}`)
  }
}
