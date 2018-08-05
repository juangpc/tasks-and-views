import { Component, OnInit } from '@angular/core';
import { Board } from '../../../interfaces/board';
import { User } from '../../../interfaces/user';
import { SessionService } from '../../../services/session';
import { BoardsService } from '../../../services/boards';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css'],
})
export class BoardsListComponent implements OnInit {

  user: User;
  showForm = false;
  boardsList: Array<Board> = [];

  constructor(public ss: SessionService,
    public bs: BoardsService,
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
      });
  }

  toggleShowForm() {
    this.showForm = !this.showForm;
  }

  submitNewBoard(name) {
    this.bs.createBoard(name, this.user._id)
      .subscribe(() => {
        this.toggleShowForm();
        this.populateBoardsList(this.user);
      });
  }

  deleteBoard(boardId) {
    this.bs.removeBoard(boardId)
      .subscribe(() => {
        this.populateBoardsList(this.user);
      });
  }

  goToBoard(boardId) {
    const thisBoard: Board = this.boardsList.find(b => b._id === boardId);
    this.bs.setActualBoard(thisBoard);
    this.router.navigate(['boards', boardId]);
  }

}

