import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() triggerUpdateList = new EventEmitter<string>();
  taskNameInputEnabled = false;
  showDescriptionMenu = false;
  buttonText = 'edit description';
  description = '';
  nameInpuEnabled = false;

  constructor(private ts: TaskService) { }

  ngOnInit() {
    console.log(this.task);
    this.description = this.task.description;
  }

  deleteTask(taskId) {
    this.ts.deleteTask(taskId)
      .subscribe(res => {
        console.log('task deleted');
        this.triggerUpdateList.emit();
      });
  }

  toggleDescription() {
    this.showDescriptionMenu = !this.showDescriptionMenu;
    if (this.showDescriptionMenu) {
      this.buttonText = 'submit';
    } else {
      this.buttonText = 'edit description';
    }
  }

  updateTask() {
    console.log(this.task);
    this.ts.updateTask(this.task)
        .subscribe(res => {
          console.log('task edited');
        });
    this.nameInpuEnabled = false;
    this.description = this.task.description;
  }

  enableNameInput() {
    this.nameInpuEnabled = true;
  }

  toggleTaskStatus() {
    this.task.active = !this.task.active;
    this.updateTask();
  }

}
