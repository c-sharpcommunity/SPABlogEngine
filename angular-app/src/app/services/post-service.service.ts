import { Injectable } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';
import { IPost } from '../models/IPost';

@Injectable()
export class PostService {
  carsList: IPost[];
  _baseUrl: string = 'https://localhost:44374/api/';
  _getPostsUrl: string = 'ManagePost';
  options = new RequestOptions({
    withCredentials: true
  });
  constructor(private http: Http) {}
  public getPosts() {
    debugger;
    return this.http
      .get(this._baseUrl + this._getPostsUrl, this.options)
      .toPromise();
  }
  public getPost(id: number) {
    return this.http
      .get(this._baseUrl + this._getPostsUrl + '/' + id, this.options)
      .toPromise();
  }
  public addNewPost(_post: IPost) {
    return this.http
      .post(this._baseUrl + this._getPostsUrl, _post, this.options)
      .toPromise();
  }
  public updatePost(_post: IPost) {
    return this.http
      .put(this._baseUrl + this._getPostsUrl + '/' + _post.id, _post, this.options)
      .toPromise();
  }
  public deletePost(id: number) {
    return this.http
      .delete(this._baseUrl + this._getPostsUrl + '/' + id, this.options)
      .toPromise();
  }
}
