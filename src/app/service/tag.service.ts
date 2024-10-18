import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TagResponse } from '../modal/Tags/TagResponse';
import { Tag } from '../modal/Tags/Tags';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http:HttpClient) { }
  getAllTags(skip: number, top: number, select: string): Observable<any> {
    const url = `${environment.urlApi}?select=${select}&count=true&skip=${skip}&top=${top}`;
    const apiurl= `${environment.urlApi}/data-api/Tag?select=${select}&count=true&skip=${skip}&top=${top}`
    return this.http.get<any>(apiurl);
  }
  // getAllTags(skip: number = 0, top: number = 5,selectedColumns: string[]=[]): Observable<TagResponse> {
  //   // const selectedColumnsString = selectedColumns.join(','); 
  //   //return this.http.get<TagResponse>(`${environment.urlApi}/data-api/Tag?select=Id,Name,ObjectType&count=true&skip=${skip}&top=${top}`);

  //   return this.http.get<TagResponse>(
  //     `${environment.urlApi}/data-api/Tag?select=${selectedColumns}&count=true&skip=${skip}&top=${top}`
  //   );
  //  // return this.http.get<TagResponse>(`${environment.urlApi}/data-api/Tag?select=Id,Name,ObjectType&count=true&skip=${skip}&top=${top}`);
  // }


  // getAlltag():Observable<TagResponse>{

  //   return this.http.get<TagResponse>(`${environment.urlApi}/data-api/Tag?select=Id,Name,ObjectType&count=true&skip=0&top=100`);
  // }
  // getAlltag(skip: number, limit: number): Observable<TagResponse> {
  //   return this.http.get<TagResponse>(`/api/tags?$skip=${skip}&$top=${limit}`);
  // }
  

  delete(tagId: number): Observable<any> {
    return this.http.delete(`${environment.urlApi}/data-api/Tag(${tagId})`); 
  }
  getTagById(tagId: number): Observable<Tag> {
    return this.http.get<Tag>(`${environment.urlApi}/data-api/Tag(${tagId})`);
  }
  update(tag: Tag): Observable<any> {
    return this.http.put(`${environment.urlApi}/data-api/Tag(${tag.Id})`, tag); // تحديث السجل الموجود
  }

  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${environment.urlApi}/data-api/Tag`, tag); // إنشاء سجل جديد
  }
}
