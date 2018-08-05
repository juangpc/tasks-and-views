import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';

import { of, BehaviorSubject } from 'rxjs';
import { Board } from '../interfaces/board';

@Injectable()
export class BoardsService {

  baseURL: string = environment.BASEURL;
  options: object = { withCredentials: true };
  b: Board;
  private viewSource = new BehaviorSubject<object>({});
  private mapperSource = new BehaviorSubject<object>({});

  selectedView$ = this.viewSource.asObservable();
  selectedMapper$ = this.mapperSource.asObservable();

  constructor(private http: Http) {
  }

  errorHandler(e) {
    console.log('boardsService Error!!!');
    console.log(e.message);
    console.log(e);
    return e;
  }

  retrieveBoards(userId) {
    return this.http.get(`${this.baseURL}/boards/${userId}`, this.options)
      .pipe(
        map((res: Response) => {
          console.log(res.json());
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  createBoard(name, userId) {
    return this.http.post(`${this.baseURL}/boards/new`, { name, userId }, this.options)
      .pipe(
        map((res: Response) => console.log(res.json())),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  removeBoard(boardId) {
    return this.http.delete(`${this.baseURL}/boards/${boardId}`, this.options)
      .pipe(
        map((res: Response) => {
          console.log('board deleted');
          console.log(res.json());
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getOneBoard(boardId) {
    return this.http.get(`${this.baseURL}/boards/one/${boardId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e))));
  }

  setActualBoard(board: Board): void {
    this.b = board;
  }

  getActualBoard(): Board {
    return this.b;
  }

  editActualBoard(obj) {
    return this.http.put(`${this.baseURL}/boards/${obj._id}`, obj, this.options)
      .pipe(
        map((res: Response) => {
          console.log(res);
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e))));
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

  setView(view) {
    this.viewSource.next(view);
  }

  setMapper(mapper) {
    this.mapperSource.next(mapper);
  }

}
