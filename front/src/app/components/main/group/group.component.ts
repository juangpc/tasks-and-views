import { Component, OnInit, OnChanges, OnDestroy, ElementRef } from '@angular/core';
import { BoardService } from '../../../services/board';
import { Subscription } from 'rxjs';
import { Group } from '../../../interfaces/group';
import { View } from '../../../interfaces/view';



@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnChanges, OnDestroy {

  // view: View;
  // selectedViewSubs: Subscription;
  // nameInputEnabled = false;
  // nameInputContainer: ElementRef;

  constructor(private bs: BoardService) { }

  ngOnInit() {
    // this.selectedViewSubs = this.bs.selectedView$
    //    .subscribe(v => this.view = v);
  }

  ngOnDestroy() {
    // this.selectedViewSubs.unsubscribe();
  }

  ngOnChanges() {

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

}



