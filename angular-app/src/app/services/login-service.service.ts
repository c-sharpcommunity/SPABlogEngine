import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { API_URI } from '../../environments/app.config';

@Injectable()
export class LoginService {
  public loginSubject = new Subject<any>();
  private url =  API_URI.ApiUrl;
  _baseUrl: string = this.url +  '/Account';

  options = new RequestOptions({
    withCredentials: true
  });
  constructor(private http: Http) {}

  public login(currentUser: User) {
    let _currentUser = JSON.stringify(currentUser);
    return this.http
      .post(this._baseUrl + '/Login', currentUser, this.options)
      .toPromise()
      .catch(this.handleError);
  }
  public logout() {
    return this.http
      .get(this._baseUrl + '/Logout', this.options)
      .toPromise()
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
