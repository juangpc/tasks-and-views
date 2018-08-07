import { Component, OnInit } from '@angular/core';
import { Task } from '../../../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  tasksList: Array<Task>;

  constructor() { }

  ngOnInit() {
  }

}
