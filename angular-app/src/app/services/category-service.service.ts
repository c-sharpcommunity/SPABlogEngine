import { Injectable } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';
import { Category } from '../models/Category';
import { API_URI } from '../../environments/app.config';

@Injectable()
export class CategoryService {
  carsList: Category[];
  private url =  API_URI.ApiUrl;
  _baseUrl: string = this.url + '/api/';
  _getCategoriesUrl: string = 'ManagePostCategory';
  options = new RequestOptions({
    withCredentials: true
  });
  constructor(private http: Http) {}
  public getCategories() {
    return this.http
      .get(this._baseUrl + this._getCategoriesUrl, this.options)
      .toPromise();
  }
  public getCategory(id: number) {
    return this.http
      .get(this._baseUrl + this._getCategoriesUrl + '/' + id, this.options)
      .toPromise();
  }
  public addNewCategory(_category: Category) {
    return this.http
      .post(this._baseUrl + this._getCategoriesUrl, _category, this.options)
      .toPromise();
  }
  public updateCategory(_category: Category) {
    return this.http
      .put(this._baseUrl + this._getCategoriesUrl + '/' + _category.id, _category, this.options)
      .toPromise();
  }
  public deleteCategory(id: number) {
    return this.http
      .delete(this._baseUrl + this._getCategoriesUrl + '/' + id, this.options)
      .toPromise();
  }
}
