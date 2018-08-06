import { Component, OnInit, Input } from '@angular/core';
import { View } from '../../../interfaces/view';
import { ViewService } from '../../../services/view';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @Input() boardId: string;
  viewsList: Array<View> = [];
  mapper: View;
  inputNewView: String = null;
  selectedView: View;
  selectedMapper: View;

  constructor(private vs: ViewService) { }

  ngOnInit() {
    console.log(this.boardId);
    this.retrieveAllViews(this.boardId);
  }

  retrieveAllViews(boardId) {
    this.vs.getAllViews(boardId)
      .subscribe(vL => {
        this.viewsList = vL;
        console.log(this.viewsList);
      });
  }

  createNewView(name) {
    console.log(name);
    if (this.viewsList.find(v => v.name === name) === undefined) {
      this.vs.addNewView(this.boardId, name)
        .subscribe((b) => {
          console.log('new view added to board');
          this.viewsList = b.views;
        });
    } else {
      console.log('View already created!!');
    }
  }

  onViewChange(a) {
    console.log(a);
  }

  onMapChange(b) {
    console.log(b);
  }

  editSelectedView(obj) {
    if (this.selectedView) {
      obj['_id'] = this.selectedView._id;
      this.vs.editView(obj)
        .subscribe( v => {
          console.log('view edited');
          this.retrieveAllViews(this.boardId);
        });
    }
  }

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



    // toggleShowNewViewForm() {
    //   this.showNewViewForm = !this.showNewViewForm;
    // }

    // onChangeViewSelector(view) {
    //   console.log(view);
    //   console.log(this.board);
    //   this.bs.setView(view);
    //   this.selectedView = view;
    // }

    // onChangeMapperSelector(view) {
    //   console.log(view);
    //   this.bs.setMapper(view);
    //   this.selectedMapper = view;
    // }


  }
