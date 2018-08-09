import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from '../../../interfaces/group';
import { GroupService } from '../../../services/group';
import { ViewService } from '../../../services/view';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  viewId: string;
  viewSubs: Subscription;
  dragSubs = new Subscription();

  groupsList: Array<Group>;
  inputNewGroup: string = null;
  nameInputEnabled = false;

  constructor(private vs: ViewService,
              private gs: GroupService,
              private ds: DragulaService) {
    this.dragSubs.add(this.ds.dropModel('GROUPS')
      .subscribe(({ name, el, target, source, sibling, sourceModel, targetModel, item }) => {
        console.log(name);
        console.log(el);
        console.log(target);
        console.log(source);
        console.log(sibling);
        console.log(sourceModel);
        console.log(targetModel);
        console.log(item);
      }));
      // .subscribe(({ name, el, source}) => {
      //   console.log(name);
      //   console.log(el);
      //   console.log(source);

      // }));
  }

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
    this.dragSubs.unsubscribe();
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

