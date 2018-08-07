import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GroupService {

  baseURL: string = environment.BASEURL;
  options: object = { withCredentials: true };


  constructor(private http: Http) {

  }

  errorHandler(e) {
    console.log('GroupService Error!!!');
    console.log(e.message);
    console.log(e);
    return e;
  }

  createGroup(viewId, name) {
    return this.http.post(`${this.baseURL}/groups/new`, {viewId, name }, this.options)
      .pipe(
        map((res: Response) => {
          // console.log(res.json());
          return res.json();
        }),
      catchError(e => of(this.errorHandler(e)))
      );
  }

  retrieveAllGroups(viewId) {
    return this.http.get(`${this.baseURL}/groups/all/${viewId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }
}
