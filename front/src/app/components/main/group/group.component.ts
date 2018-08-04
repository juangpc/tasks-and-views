import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../../services/boards';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: Array<object> = [];

  constructor(private bs: BoardsService) { }

  ngOnInit() {
    const b = this.bs.getActualBoard();
    // this.groups = b.
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
