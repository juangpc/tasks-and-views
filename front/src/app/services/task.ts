import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Task } from '../interfaces/task';

@Injectable()
export class TaskService {

  baseURL: string = environment.BASEURL;
  options: object = { withCredentials: true };
  taskList: Array<Task>;

  constructor(private http: Http) {

  }





}





