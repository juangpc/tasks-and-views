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
        if (v._id) {
          // console.log(v);
          this.viewId = v._id;
          this.retrieveAllGroups(this.viewId);
        }
      });
  }

  ngOnDestroy() {
    this.viewSubs.unsubscribe();
  }

  ngOnChanges() {

  }

  retrieveAllGroups(viewId) {
    this.gs.retrieveAllGroups(viewId)
      .subscribe(gL => {
        this.groupsList = gL;
        // console.log(this.groupsList);
      });
  }

  submitNewGroup(name: string): void {
    if (this.groupsList.find(g => g.name === name) === undefined) {
      this.gs.createGroup(this.viewId, name)
        .subscribe(v => {
          this.groupsList = v.groups;
          this.inputNewGroup = '';
        });
    } else {
      console.log('There is group with that name!');
    }
  }


}


  // newGroupInputEnabler(): void {
  //   this.nameInputEnabled = true;
  // }

  // nameInputSubmiter(obj): void {
  //   this.nameInputContainer.nativeElement.focus();
  //   this.nameInputEnabled = false;
  //   obj['_id'] = this.view._id;
  //   this.bs.editView(obj)
  //     .subscribe(v => {
  //       console.log('view edited');
  //       this.view = v;
  //     });
  // }

    // toggleShowNewGroupForm() {
    //   this.showNewGroupForm = !this.showNewGroupForm;
    // }

    // submitNewGroup(name) {
    //   console.log(`Creating new group with name: ${name}`);
    //   // this.gs.createGroup(name, this.user._id)
    //   //   .subscribe(() => {
    //   //     this.toggleShowForm();
    //   //     this.populateBoardsList(this.user);
    //   //   });
    // }



