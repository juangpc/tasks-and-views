import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Task } from '../interfaces/task';
import { of } from 'rxjs';

@Injectable()
export class TaskService {

  baseURL: string = environment.BASEURL;
  options: object = { withCredentials: true };

  constructor(private http: Http) { }

  errorHandler(e) {
    console.log('View Service Error!!!');
    console.log(e.message);
    console.log(e);
    return e;
  }

  getAllTasks(groupId) {
    return this.http.get(`${this.baseURL}/tasks/all/${groupId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  getOneTask(taskId) {

  }

  createTask(board, group, name) {
    console.log(board);
    console.log(group);
    console.log(name);
    return this.http.post(`${this.baseURL}/tasks/new`, { board, group, name }, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  updateTask(task) {
    return this.http.put(`${this.baseURL}/tasks/${task._id}`, task, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

  deleteTask(taskId) {
    return this.http.delete(`${this.baseURL}/tasks/${taskId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
        catchError(e => of(this.errorHandler(e)))
      );
  }

}





