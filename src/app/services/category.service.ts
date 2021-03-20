import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private httpClient:HttpClient) { }

  getCategoryList() : Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.baseUrl);
  }

}
