import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Category } from '../modal/Category/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(`${environment.urlApi}/data-api/Category?expand=AttributeValues,ClonedCategories,Translations&$select=AttributeValues,Id,Name,ParentId,Position,ClonedCategories,Translations`).pipe(
      tap(m=>console.log('data ',m)
      ),
      map(response => response.value) 
    );
  }
}





