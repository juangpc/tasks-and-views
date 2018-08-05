import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardsService } from '../../../services/boards';
import { GroupService } from '../../../services/group';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  view: object;
  mapper: object;
  selViewSubscription: Subscription;

  showNewGroupForm = false;

  constructor(private bs: BoardsService,
              private gs: GroupService ) { }

  ngOnInit() {
    this.selViewSubscription = this.bs.selectedView$
      .subscribe(v => {
        this.view = v;

      });
  }

  ngOnDestroy() {
    this.selViewSubscription.unsubscribe();
  }

  toggleShowNewGroupForm() {
    this.showNewGroupForm = !this.showNewGroupForm;
  }

  submitNewGroup(name) {
    console.log(`Creating new group with name: ${name}`);
    // this.gs.createGroup(name, this.user._id)
    //   .subscribe(() => {
    //     this.toggleShowForm();
    //     this.populateBoardsList(this.user);
    //   });
  }



}
