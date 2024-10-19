import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://pim.itmd-b1.com/api/data-api/Category?expand=AttributeValues,ClonedCategories,Translations&$select=AttributeValues,Id,Name,ParentId,Position,ClonedCategories,Translations';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(m=>console.log('data ',m)
      ),
      map(response => response.value) 
    );
  }
}
export interface AttributeValue {
  Id: number;
  ObjectId: number;
  ObjectType: number;
  AttributeId: number;
  LanguageId: number;
  Value: string | null;
  OptionValueId: number | null;
  MediaObjectId: number | null;
}

export interface Translation {
  Id: number;
  ObjectType: number;
  ObjectId: number;
  ObjectField: string;
  LanguageId: number;
  Label: string;
}

export interface Category {
  Id: number;
  Name: string;
  ParentId: number | null;
  Position: number;
  AttributeValues: AttributeValue[];
  ClonedCategories: any[];
  Translations: Translation[];

}


