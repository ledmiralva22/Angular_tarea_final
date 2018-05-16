import { Injectable } from '@angular/core';
import { Article } from '../_models/article.model';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operator/map';
import { mapTo } from 'rxjs/operators';
import { IArticleFilterParam } from '../_models/shared.model';

@Injectable()
export class ArticlesService {
  articles: Article[];
  apiUrl: string = "http://localhost:3000";
  constructor(private http: HttpClient) {
    /*this.articles = [
      new Article('Angular 2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 1),
    ];*/
  }
  addArticle(title: HTMLInputElement, link: HTMLInputElement) {
    //this.articles.push(new Article(title.value, link.value, 0));
    let newArticle = new Article(title.value, link.value, 0);
    return this.http.post<Article[]>(`${this.apiUrl}/articles`, newArticle)
      .pipe();
  }
  getList(filters: IArticleFilterParam): Observable<Article[]> {
    let params = new HttpParams();
    params = params.append('_sort', filters.sortBy.toLowerCase());
    params = params.append('_order', "desc");
    return this.http.get<Article[]>(`${this.apiUrl}/articles`, { params: params })
      .pipe();
  }
  getAll(): Observable<Article[]> {
    let params = new HttpParams();
    params = params.append('_sort', "votes");
    params = params.append('_order', "desc");
    return this.http.get<Article[]>(`${this.apiUrl}/articles`, { params: params })
      .pipe();
  }

  getArticle(id: number) : Observable<Article>{
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}`).pipe();
  }

  updateArticle(article: Article, id: number) : Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/articles/${id}`, article).pipe();
  }

  deleteArticle(id: number) : Observable<Article> {
    return this.http.delete<Article>(`${this.apiUrl}/articles/${id}`).pipe();
  }
}
