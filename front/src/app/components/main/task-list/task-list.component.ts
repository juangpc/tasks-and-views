import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../../services/group';
import { Group } from '../../../interfaces/group';
import { TaskService } from '../../../services/task';
import { BoardService } from '../../../services/board';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

  @Input() group: Group;
  @Output() triggerUpdateList = new EventEmitter<string>();
  groupColor: string;
  groupNameInputEnabled = false;
  inputNewTask = '';
  public TASKS = 'TASKS';
  public dragSubs = new Subscription();

  boardIdSubs: Subscription;
  boardId: string;

  constructor(private gs: GroupService,
    private bs: BoardService,
    private ts: TaskService,
    private ds: DragulaService) {

    this.dragSubs.add(this.ds.dropModel(this.TASKS)
      .subscribe(({sourceModel, targetModel}) => {
        console.log(this.group.name);
        console.log(this.group.tasks);
        // console.log(this.group.tasks);
        console.log(sourceModel);
        console.log(targetModel);
      }));
    }

  ngOnInit() {
    // console.log(this.group);
    if (this.group) {
      this.groupColor = this.group.color;
    }
    this.boardIdSubs = this.bs.boardId$
      .subscribe(boardId => {
        this.boardId = boardId;
      });
    this.retrieveGroup();
  }

  retrieveGroup() {
    this.gs.getOneGroup(this.group._id)
      .subscribe(g => {
        this.group = g;
      });
  }

  onDeleteGroup(groupId) {
    // console.log(groupId);
    this.gs.deleteGroup(groupId)
      .subscribe((res) => {
        // console.log(res);
        this.triggerUpdateList.emit();
      });
  }

  saveColor() {
    this.group.color = this.groupColor;
    this.gs.updateGroup(this.group).subscribe();
  }

  groupNameInputDisabler(name) {
    this.groupNameInputEnabled = false;
    this.group.name = name;
    this.gs.updateGroup(this.group).subscribe();
  }

  groupNameInputEnabler() {
    this.groupNameInputEnabled = true;
  }

  submitNewTask(name) {
    this.inputNewTask = '';
    this.ts.createTask(this.boardId, this.group._id, name)
      .subscribe(res => {
        this.retrieveGroup();
      });
  }

}


