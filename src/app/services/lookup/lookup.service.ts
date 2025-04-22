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

  updateCategory(category_id:string, req):Observable<any>{
    return this.http.put(`categories/main/${category_id}`, req)
  }

  getCategory(category_id:string):Observable<any>{
    return this.http.get(`categories/main/${category_id}`)
  }

  deleteCategory(category_id:string):Observable<any>{
    return this.http.delete(`categories/main/${category_id}`)
  } 



// SUB CATEGORIES API CALLS 
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

  updateSubCategory(sub_category_id:string, req):Observable<any>{
    return this.http.put(`categories/sub/${sub_category_id}`, req)
  }

  getSubCategory(sub_category_id:string):Observable<any>{
    return this.http.get(`categories/sub/${sub_category_id}`)
  }

  deleteSubCategory(sub_category_id:string):Observable<any>{
    return this.http.delete(`categories/sub/${sub_category_id}`)
  } 
 


}
