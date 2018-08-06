import { Component, OnInit } from '@angular/core';
import { Board } from '../../../interfaces/board';
import { User } from '../../../interfaces/user';
import { SessionService } from '../../../services/session';
import { BoardService } from '../../../services/board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css'],
})
export class BoardsListComponent implements OnInit {

  user: User;
  boardsList: Array<Board> = [];
  inputNewBoard: String = null;

  constructor(public ss: SessionService,
    public bs: BoardService,
    private router: Router) { }

  ngOnInit() {
    this.ss.isLogged().subscribe(u => {
      this.user = u;
      this.populateBoardsList(u);
    });
  }

  populateBoardsList(user) {
    this.bs.retrieveBoards(user._id)
      .subscribe((list) => {
        this.boardsList = list;
        console.log(this.boardsList);
      });
  }

  submitNewBoard(name) {
    console.log(name);
    this.bs.createBoard(this.user._id, name)
      .subscribe(() => {
        this.populateBoardsList(this.user);
        this.inputNewBoard = '';
      });
  }

  deleteBoard(boardId) {
    this.bs.removeBoard(boardId)
      .subscribe(() => {
        this.populateBoardsList(this.user);
      });
  }

  goToBoard(boardId) {
    // console.log(boardId);
    // const thisBoard: Board = this.boardsList.find(b => b._id === boardId);
    // this.bs.setActualBoard(thisBoard);
    this.router.navigate(['boards', boardId]);
  }

}

