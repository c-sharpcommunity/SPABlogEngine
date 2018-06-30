import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class LoginService {
  public loginSubject = new Subject<any>();
  _baseUrl: string = 'https://localhost:44374/Account';

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
