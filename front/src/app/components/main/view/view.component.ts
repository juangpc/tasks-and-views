import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardsService } from '../../../services/boards';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  selView: string;
  selMapper: string;
  selViewSubscription: Subscription;
  showNewGroupForm = false;
  groupList: Array<object>;

  constructor(private bs: BoardsService) { }

  ngOnInit() {
    this.selViewSubscription = this.bs.selectedView$
      .subscribe(v => {
        this.selView = v;

      });
  }

  ngOnDestroy() {
    this.selViewSubscription.unsubscribe();
  }

  toggleShowNewGroupForm() {
    this.showNewGroupForm = !this.showNewGroupForm;
  }

  submitNewGroup(name) {
    console.log(name);
  }



}
