import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class LookupService extends BaseApiService {
  // {
  //   "cName": "string",
  //   "is_active": true,
  //   "ID": 0,
  //   "created_at": "2025-04-19T10:32:17.450Z",
  //   "updated_at": "2025-04-19T10:32:17.450Z"
  // }

  // {value:string, viewValue:string, id:string}
 

  getCategories():Observable<any>{
    return this.http.get('categories/main').pipe(
      map((categories:any[]) => {
         return categories.map((category) => {
            return {
              ID: category?.ID,
              value: category?.cName,
              viewValue: category?.cName,
              id: `${category?.ID}`,
              ...category
            }

         })
      })
    )
  }

  addCategory(req):Observable<any>{
    return this.http.post('categories/main', req)
  }

  updateCategory(categoryId:number, req):Observable<any>{
    return this.http.put(`categories/main/${categoryId}`, req)
  }

  getCategory(categoryId:number):Observable<any>{
    return this.http.get(`categories/main/${categoryId}`)
  }

  deleteCategory(categoryId:number):Observable<any>{
    return this.http.delete(`categories/main/${categoryId}`)
  } 

  getSubCategories():Observable<any>{
    return this.http.get('categories/sub').pipe(
      map((subCategories:any[]) => {

        return subCategories.map((subCategory) => {
          return {
            ID: subCategory?.ID,
            value: subCategory?.subCname,
            viewValue: subCategory?.subCname,
            id: `${subCategory?.ID}`,
            ...subCategory
          }
        })
         
      })
    )
  }

  addSubCategory(req):Observable<any>{
    return this.http.post('categories/sub', req)
  }

  updateSubCategory(ID:number, req):Observable<any>{
    return this.http.put(`categories/sub/${ID}`, req)
  }

  getSubCategory(ID:number):Observable<any>{
    return this.http.get(`categories/sub/${ID}`)
  }

  deleteSubCategory(ID:number):Observable<any>{
    return this.http.delete(`categories/sub/${ID}`)
  } 
 


}
