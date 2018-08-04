import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../../services/boards';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../interfaces/user';
import { Board } from '../../../interfaces/board';
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
  groupInputEnabled = false;

  constructor(
    private ss: SessionService,
    private bs: BoardsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.boardId = params['id'];
        this.board = this.bs.getActualBoard();
        if (!this.board || this.board._id !== this.boardId) {
          // console.log('recuperando board del servidor');
          this.getThisBoard(this.boardId);
          this.bs.setActualBoard(this.board);
        }
        this.ss.isLogged().subscribe(u => {
          this.user = u;
          if (this.board) {
            this.isOwner = (this.user._id === this.board['owner']);
          }
        });
      });
  }

  getThisBoard(boardId): void {
    this.bs.getOneBoard(boardId)
      .subscribe(b => {
        this.board = b;
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
    this.nameInputEnabled = false;
    obj['_id'] = this.board._id;
    this.bs.editActualBoard(obj)
      .subscribe((e) => {
        console.log('board edited');
      });
  }

  nameInputEnabler(): void {
    this.nameInputEnabled = true;
  }

  newGroupInputDisabler(ng):void {
    this.newGroupInput= false;
    console.log(ng);
    console.log(this.board);
  }

  newGroupInputEnabler(): void{
    this.newGroupInput= true;
  }

}