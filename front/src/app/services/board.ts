import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';

import { of, BehaviorSubject } from 'rxjs';
import { Board } from '../interfaces/board';


@Injectable()
export class BoardService {

  baseURL: string = environment.BASEURL;
  options: object = { withCredentials: true };

  boardIdSource = new BehaviorSubject<string>('');
  boardId$ = this.boardIdSource.asObservable();

  constructor(private http: Http) {
  }

  errorHandler(e) {
    console.log('boardsService Error!!!');
    console.log(e.message);
    console.log(e);
    return e;
  }

  setBoardId(id: string): void {
    this.boardIdSource.next(id);
  }

  retrieveBoards(userId) {
    return this.http.get(`${this.baseURL}/boards/all/${userId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getOneBoard(boardId) {
    return this.http.get(`${this.baseURL}/boards/${boardId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  createBoard(userId, name) {
    return this.http.post(`${this.baseURL}/boards/new`, { userId, name }, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  editBoard(obj) {
    return this.http.put(`${this.baseURL}/boards/${obj._id}`, obj, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  removeBoard(boardId) {
    return this.http.delete(`${this.baseURL}/boards/${boardId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

}
