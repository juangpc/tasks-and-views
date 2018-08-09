import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class GroupService {

  baseURL: string = environment.BASEURL;
  options: object = { withCredentials: true };

  colors: Array<object> = [
    { name: 'aqua', value: '#00ffff' },
    { name: 'azure', value: '#f0ffff' },
    { name: 'beige', value: '#f5f5dc' },
    { name: 'blue', value: '#0000ff' },
    { name: 'brown', value: '#a52a2a' },
    { name: 'cyan', value: '#00ffff' },
    { name: 'fuchsia', value: '#ff00ff' },
    { name: 'gold', value: '#ffd700' },
    { name: 'green', value: '#008000' },
    { name: 'indigo', value: '#4b0082' },
    { name: 'khaki', value: '#f0e68c' },
    { name: 'lightblue', value: '#add8e6' },
    { name: 'lightcyan', value: '#e0ffff' },
    { name: 'lightgreen', value: '#90ee90' },
    { name: 'lightgrey', value: '#d3d3d3' },
    { name: 'lightpink', value: '#ffb6c1' },
    { name: 'lightyellow', value: '#ffffe0' },
    { name: 'lime', value: '#00ff00' },
    { name: 'magenta', value: '#ff00ff' },
    { name: 'maroon', value: '#800000' },
    { name: 'navy', value: '#000080' },
    { name: 'olive', value: '#808000' },
    { name: 'orange', value: '#ffa500' },
    { name: 'pink', value: '#ffc0cb' },
    { name: 'purple', value: '#800080' },
    { name: 'violet', value: '#800080' },
    { name: 'red', value: '#ff0000' },
    { name: 'silver', value: '#c0c0c0' },
    { name: 'white', value: '#ffffff' },
    { name: 'yellow', value: '#ffff00' }
  ];

  constructor(private http: Http) {

  }

  errorHandler(e) {
    console.log('GroupService Error!!!');
    console.log(e.message);
    console.log(e);
    return e;
  }

  createGroup(viewId, name) {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)]['value'];
    return this.http.post(`${this.baseURL}/groups/new`, { viewId, name , color}, this.options)
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

  deleteGroup(id: string): any {
    return this.http.delete(`${this.baseURL}/groups/${id}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      catchError(e => of(this.errorHandler(e))));
  }

  updateGroup(modifGroup): any {
    return this.http.put(`${this.baseURL}/groups/${modifGroup._id}`, modifGroup, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      catchError(e => of(this.errorHandler(e))));
  }

  getOneGroup(groupId) {
    return this.http.get(`${this.baseURL}/groups/${groupId}`, this.options)
      .pipe(
        map((res: Response) => {
          return res.json();
        }),
      catchError(e => of(this.errorHandler(e)))
      );
  }

}
