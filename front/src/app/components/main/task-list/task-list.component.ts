import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GroupService } from '../../../services/group';
import { Group } from '../../../interfaces/group';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

  @Input() group: Group;
  @Output() triggerUpdateList = new EventEmitter<string>();
  groupColor: string;

  constructor(private gs: GroupService) { }

  ngOnInit() {
    if (this.group) {
      this.groupColor = this.group.color;
    }
  }

  onDeleteGroup(groupId) {
    // console.log(groupId);
    this.gs.deleteGroup(groupId)
      .subscribe((res) => {
        console.log(res);
        this.triggerUpdateList.emit();
      });
  }

  saveColor() {
    this.group.color = this.groupColor;
    this.gs.updateGroup(this.group)
      .subscribe((res) => {
        console.log(res);
        this.triggerUpdateList.emit();
    });
  }


}


