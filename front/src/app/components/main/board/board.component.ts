import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BoardService } from '../../../services/board';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../interfaces/user';
import { Board } from '../../../interfaces/board';
import { View } from '../../../interfaces/view';
import { SessionService } from '../../../services/session';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  user: User;
  isOwner = false;
  boardId: string;
  board: Board;
  nameInputEnabled = false;

  @ViewChild('focusable') vc: ElementRef;

  constructor(
    private ss: SessionService,
    private bs: BoardService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.boardId = params['id'];
        // console.log('recuperando board del servidor');
        this.getOneBoard(this.boardId);
        this.ss.isLogged().subscribe(u => {
          this.user = u;
          if (this.board) {
            this.isOwner = (this.user._id === this.board['owner']);
          }
        });
      });
  }

  getOneBoard(boardId): void {
    this.bs.getOneBoard(boardId)
      .subscribe(b => {
        this.board = b;
        // this.bs.setActualBoard(b);
      });
  }

  deleteThisBoard(boardId): void {
    this.bs.removeBoard(boardId)
      .subscribe(() => {
        console.log('board deleted');
        this.router.navigate(['/boards']);
      });
  }

  nameInputDisabler(obj): void {
    this.vc.nativeElement.focus();
    this.nameInputEnabled = false;
    obj['_id'] = this.board._id;
    this.bs.editBoard(obj)
      .subscribe((b) => {
        console.log('board edited');
        this.board = b;
      });
  }

  nameInputEnabler(): void {
    this.nameInputEnabled = true;
  }

}
