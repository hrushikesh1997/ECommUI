import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient:HttpClient) { }

  getProduct(id:number): Observable<Product>{
    const url = this.baseUrl+`/${id}`;
    return this.httpClient.get<Product>(url);
  }
  getProductList(pageNum: number, pageSize: number) : Observable<GetPageResponse>{
    const url = this.baseUrl+`?page=${pageNum}&size=${pageSize}`
    return this.httpClient.get<GetPageResponse>(url);
  }
  searchProducts(key:string,pageNum: number, pageSize: number) : Observable<GetPageResponse>{
    const url = this.baseUrl+`/search?key=${key}&page=${pageNum}&size=${pageSize}`
    return this.httpClient.get<GetPageResponse>(url);
  }

  // Paginated Service
  getProductsByCategoryIdPage(pageNum: number, pageSize: number,categoryId : number) : Observable<GetPageResponse>{
    const url = `${this.baseUrl}/category?id=${categoryId}&page=${pageNum}&size=${pageSize}`
    return this.httpClient.get<GetPageResponse>(url);
  }

  getProductsByCategoryId(categoryId : number){
    const url = `${this.baseUrl}/category?id=${categoryId}`
    return this.httpClient.get<GetPageResponse>(url).pipe(
      map(response => response.content)
    );
  }
}

interface GetPageResponse {
  content : Product[],
  totalElements : number,
  totalPages : number,
  number : number,
  size : number,
  numberOfElements : number,
  first : boolean,
  empty : boolean,
  last : boolean
}
