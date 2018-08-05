import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardsService } from '../../../services/boards';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {

  groups: Array<object> = [];
  
  selectedView: string;
  selectedViewSubs: Subscription;

  constructor(private bs: BoardsService) { }

  ngOnInit() {
    this.selectedViewSubs = this.bs.selectedView$
      .subscribe(v => this.selectedView = v);
  }

  ngOnDestroy() {
    this.selectedViewSubs.unsubscribe();
  }
  // newGroupInputDisabler(ng): void {
  //   this.vc.nativeElement.focus();
  //   this.groupInputEnabled = false;
  //   // console.log(ng);
  //   // console.log(this.board);
  // }

  // newGroupInputEnabler(): void {
  //   this.groupInputEnabled = true;
  // }
}
