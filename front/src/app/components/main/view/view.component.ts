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
  inputNewView: String = null;

  selectedView: View = undefined;
  selectedMapper: View = undefined;

  constructor(private vs: ViewService) { }

  ngOnInit() {
    // console.log(this.boardId);
    this.retrieveAllViews(this.boardId);
    // console.log(typeof this.selectedView)
    this.vs.setView(this.selectedView);
    this.vs.setMapper(this.selectedMapper);
  }

  retrieveAllViews(boardId) {
    this.vs.getAllViews(boardId)
      .subscribe(vL => {
        this.viewsList = vL;
        // console.log(this.viewsList);
      });
  }

  createNewView(name) {
    // console.log(name);
    if (this.viewsList.find(v => v.name === name) === undefined) {
      this.vs.addNewView(this.boardId, name)
        .subscribe((b) => {
          // console.log('new view added to board');
          this.viewsList = b.views;
          this.inputNewView = '';
        });
    } else {
      console.log('View already created!!');
    }
  }

  onViewChange() {
    this.vs.setView(this.selectedView);
  }

  onMapChange() {
    this.vs.setMapper(this.selectedMapper);
  }

  editSelectedView(obj) {
    if (this.selectedView) {
      obj['_id'] = this.selectedView._id;
      // console.log(obj);
      this.vs.editView(obj)
        .subscribe( v => {
          this.retrieveAllViews(this.boardId);
        });
    }
  }

  editSelectedMapper(obj) {
    if (this.selectedMapper) {
      obj['_id'] = this.selectedMapper._id;
      // console.log(obj);
      this.vs.editView(obj)
        .subscribe( v => {
          this.retrieveAllViews(this.boardId);
        });
    }
  }

}

