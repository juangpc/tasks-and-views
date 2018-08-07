import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from '../../../interfaces/group';
import { GroupService } from '../../../services/group';
import { ViewService } from '../../../services/view';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnChanges, OnDestroy {

  viewId: string;
  viewSubs: Subscription;
  groupsList: Array<Group>;
  inputNewGroup: string = null;

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
    console.log('destruyendo component group');
    this.groupsList = undefined;
  }

  ngOnChanges() {

  }

  retrieveAllGroups(viewId) {
    this.gs.retrieveAllGroups(viewId)
      .subscribe(gL => {
        this.groupsList = gL;
        console.log(this.groupsList);
      });
  }

  submitNewGroup(name: string): void {
    this.inputNewGroup = '';
    if (this.groupsList.find(g => g.name === name) === undefined) {
      this.gs.createGroup(this.viewId, name)
        .subscribe(v => {
          this.groupsList = v.groups;
        });
    } else {
      console.log('There is group with that name!');
    }
  }

}

