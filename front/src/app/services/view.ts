import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { View } from '../interfaces/view';

@Injectable()
export class ViewService {

  baseURL: string = environment.BASEURL;
  options: object = { withCredentials: true };
  viewsList: Array<View>;
  view: View;
  map: View;

  constructor(private http: Http) {

  }

  errorHandler(e) {
    console.log('View Service Error!!!');
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAllViews(boardId) {
    return this.http.get(`${this.baseURL}/views/all/${boardId}`,this.options)
      .pipe(
        map((res: Response) => {
          this.viewsList = res.json();
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  addNewView(boardId, name) {
    const obj = {
      name,
      board: boardId
    };
    // comprobar que no está ya una con el mismo nombre !!!!!
    return this.http.post(`${this.baseURL}/views/new`, obj, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e))));
  }

  editView(obj) {
    console.log(obj);
    return this.http.put(`${this.baseURL}/views/${obj._id}`,obj,this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e))));
  }


  getOneView(viewId) {
    return this.http.get(`${this.baseURL}/views/${viewId}`,this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError( e => of(this.errorHandler(e))));
  }


  // private viewSource = new BehaviorSubject<View>({});
  // private mapperSource = new BehaviorSubject<View>({});

  // selectedView$ = this.viewSource.asObservable();
  // selectedMapper$ = this.mapperSource.asObservable();

  //   editView(obj) {
  //     return this.http.put(`${this.baseURL}/views/${obj._id}`, obj, this.options)
  //       .pipe(
  //         map((res: Response) => {
  //           console.log(res);
  //           return res.json();
  //         }),
  //         catchError(e => of(this.errorHandler(e)))
  //       );
  //   }

  //   setView(view) {
  //     this.viewSource.next(view);
  //   }

  //   setMapper(mapper) {
  //     this.mapperSource.next(mapper);
  //   }






}


