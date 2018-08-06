import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { BoardsService } from '../../../services/boards';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnChanges, OnDestroy {

  selectedView: object;
  selectedViewSubs: Subscription;
  nameInputEnabled = false;

  constructor(private bs: BoardsService) { }

  ngOnInit() {
    this.selectedViewSubs = this.bs.selectedView$
       .subscribe(v => this.selectedView = v);
  }

  ngOnDestroy() {
    this.selectedViewSubs.unsubscribe();
  }

  ngOnChanges() {
  }

  newGroupInputEnabler(): void {
    this.nameInputEnabled = true;
  }

  nameInputSubmiter(obj): void {
    this.nameInputContainer.focus();
    this.
  }

}
