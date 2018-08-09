import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { View } from '../interfaces/view';

@Injectable()
export class ViewService {

  baseURL: string = environment.BASEURL;
  options: object = { withCredentials: true };
  viewsList: Array<View>;

  selectedViewSource = new BehaviorSubject<View>(undefined);
  selectedMapperSource = new BehaviorSubject<View>(undefined);

  selectedView$ = this.selectedViewSource.asObservable();
  selectedMapper$ = this.selectedMapperSource.asObservable();

  constructor(private http: Http) {

  }

  errorHandler(e) {
    console.log('View Service Error!!!');
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAllViews(boardId) {
    return this.http.get(`${this.baseURL}/views/all/${boardId}`, this.options)
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
    return this.http.post(`${this.baseURL}/views/new`, obj, this.options)
      .pipe(
        map((res: Response) => {
          // console.log(res.json());
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e))));
  }

  editView(obj: any) {
    // console.log(obj);
    return this.http.put(`${this.baseURL}/views/${obj._id}`, obj, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e))));
  }


  getOneView(viewId: string) {
    return this.http.get(`${this.baseURL}/views/${viewId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e))));
  }

  setView(view: View): void {
    this.selectedViewSource.next(view);
  }

  setMapper(mapper: View): void {
    this.selectedMapperSource.next(mapper);
  }

  deleteView(id: string): any {
    return this.http.delete(`${this.baseURL}/views/${id}`, this.options)
      .pipe(
        map((res: Response) => {
          console.log(res.json());
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e))));
  }

}


