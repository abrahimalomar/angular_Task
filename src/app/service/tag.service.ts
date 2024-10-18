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
    const apiurl= `${environment.urlApi}/data-api/Tag?select=${select}&count=true&skip=${skip}&top=${top}`
    return this.http.get<any>(apiurl);
  }
 
  

  delete(tagId: number): Observable<any> {
    return this.http.delete(`${environment.urlApi}/data-api/Tag(${tagId})`); 
  }
  getTagById(tagId: number): Observable<Tag> {
    return this.http.get<Tag>(`${environment.urlApi}/data-api/Tag(${tagId})`);
  }
  update(tag: Tag): Observable<any> {
    return this.http.put(`${environment.urlApi}/data-api/Tag(${tag.Id})`, tag); 
  }

  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${environment.urlApi}/data-api/Tag`, tag);
  }
}
