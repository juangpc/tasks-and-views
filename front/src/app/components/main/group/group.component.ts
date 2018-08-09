import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from '../../../interfaces/group';
import { View } from '../../../interfaces/view';
import { Task } from '../../../interfaces/task';
import { GroupService } from '../../../services/group';
import { ViewService } from '../../../services/view';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  view: View;
  viewSubs: Subscription;
  public dragSubsGroup = new Subscription();
  public GROUPS = 'GROUPS';
  public groupsList: Array<Group>;
  public tasksPool: Array<Task>;

  public TASKS = 'TASKS';
  public dragSubsTask = new Subscription();

  inputNewGroup: string = null;
  nameInputEnabled = false;

  constructor(private vs: ViewService,
    private gs: GroupService,
    private ds: DragulaService) {

    this.dragSubsGroup.add(this.ds.dropModel(this.GROUPS)
      .subscribe(({ targetModel }) => {
        // console.log(targetModel);
        // console.log(this.groupsList);
        const updatedView = {
          _id: this.view._id,
          name: this.view.name,
          board: this.view.board,
          groups: []
        };
        targetModel.forEach(e => updatedView.groups.push(e._id));
        this.saveView(updatedView);
      }));

    this.dragSubsTask.add(this.ds.dropModel(this.TASKS)
      .subscribe(({ target, source, sourceModel, targetModel }) => {
        const s = this.getElementIndex(source.parentElement.parentElement.parentElement);
        const t = this.getElementIndex(target.parentElement.parentElement.parentElement);
        // console.log(`From group ${s} to group ${t}`);
        // console.log(sourceModel);
        // console.log(targetModel);
        const sGroup = this.groupsList[s];
        sGroup.tasks = sourceModel;
        // console.log(sGroup);
        this.gs.updateGroup(sGroup).subscribe();
        if (t !== s) {
          const tGroup = this.groupsList[t];
          tGroup.tasks = targetModel;
          this.gs.updateGroup(tGroup).subscribe();
        }
      }));
  }

  ngOnInit() {
    this.viewSubs = this.vs.selectedView$
      .subscribe(v => {
        if (v) {
          // console.log(v);
          this.view = v;
          this.retrieveAllGroups(this.view._id);
        }
      });
  }

  ngOnDestroy() {
    this.viewSubs.unsubscribe();
    // console.log('destruyendo component group');
    this.dragSubsGroup.unsubscribe();
    this.dragSubsTask.unsubscribe();
  }

  retrieveAllGroups(viewId) {
    this.gs.retrieveAllGroups(viewId)
      .subscribe(gL => {
        this.groupsList = gL;
      });
  }

  submitNewGroup(name: string): void {
    this.inputNewGroup = '';
    this.nameInputEnabled = false;
    this.gs.createGroup(this.view._id, this.view.board, name)
      .subscribe(v => {
        this.groupsList = v.groups;
      });
  }

  saveView(newView) {
    this.vs.editView(newView)
      .subscribe(gl => {
        // console.log(gl);
        // this.groupsList=gl;
      });
  }

  updateGroupList(): void {
    this.retrieveAllGroups(this.view._id);
  }

  nameInputEnabler() {
    this.nameInputEnabled = true;
  }

  nameInputDisabler() {
    this.nameInputEnabled = false;
  }

  getElementIndex(el: any) {
    // console.log([].slice.call(el.parentElement.children).indexOf(el));
    return [].slice.call(el.parentElement.children).indexOf(el);
  }

}

