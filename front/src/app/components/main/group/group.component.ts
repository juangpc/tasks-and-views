import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from '../../../interfaces/group';
import { GroupService } from '../../../services/group';
import { ViewService } from '../../../services/view';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  viewId: string;
  viewSubs: Subscription;

  groupsList: Array<Group>;
  inputNewGroup: string = null;
  nameInputEnabled = false;

  constructor(private vs: ViewService, private gs: GroupService) { }

  ngOnInit() {
    this.viewSubs = this.vs.selectedView$
      .subscribe(v => {
        if (v) {
          console.log(v);
          this.viewId = v._id;
          this.retrieveAllGroups(this.viewId);
        }
      });
  }

  ngOnDestroy() {
    this.viewSubs.unsubscribe();
    // console.log('destruyendo component group');
  }

  retrieveAllGroups(viewId) {
    this.gs.retrieveAllGroups(viewId)
      .subscribe(gL => {
        this.groupsList = gL;
        // console.log(this.groupsList);
      });
  }

  submitNewGroup(name: string): void {
    this.inputNewGroup = '';
    this.nameInputEnabled = false;
    this.gs.createGroup(this.viewId, name)
      .subscribe(v => {
        this.groupsList = v.groups;
      });
  }

  updateGroupList(): void {
    this.retrieveAllGroups(this.viewId);
  }

  nameInputEnabler() {
    this.nameInputEnabled = true;
  }

  nameInputDisabler() {
    this.nameInputEnabled = false;
  }

}

