import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

const { BASEURL } = environment;

@Injectable()
export class SessionService {

  user: User;
  options: object = { withCredentials: true };

  constructor(public http: Http) {
  }

  errorHandler(e) {
    // console.log('SessionServiceError');
    // console.log(e.message);
    // console.log(e);
    return e;
  }

  isLogged() {
    return this.http.get(`${BASEURL}/auth/currentuser`, this.options).pipe(
      map((res: Response) => {
        this.user = res.json();
        // console.log(`Automatically login ${this.user.username}`);
        return this.user;
      }),
      catchError(e => {
        // console.log('You have to login first!');
        return of(e);
      })
    );
  }

  signup(newUser: User): Observable<object> {
    return this.http.post(`${BASEURL}/auth/signup`, newUser, this.options).pipe(
      map((res: Response) => {
        const data = res.json();
        this.user = data.user;
        return this.user;
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  login(newUser: User): Observable<object> {
    return this.http.post(`${BASEURL}/auth/login`, newUser, this.options).pipe(
      map((res: Response) => {
        const user = res.json();
        this.user = user;
        return this.user;
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

  logout() {
    return this.http.get(`${BASEURL}/auth/logout`, this.options).pipe(
      map((res: Response) => {
        this.user = null;
      }),
      catchError(e => of(this.errorHandler(e)))
    );
  }

}
