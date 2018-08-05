import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  showNewViewForm = false;
  selectedView: string;
  selectedMapper: string;

  @ViewChild('focusable') vc: ElementRef;

  constructor(
    private ss: SessionService,
    private bs: BoardsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.boardId = params['id'];
        // console.log('recuperando board del servidor');
        this.getThisBoard(this.boardId);
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
        this.bs.setActualBoard(b);
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
    this.bs.editActualBoard(obj)
      .subscribe((b) => {
        console.log('board edited');
        this.board = b;
      });
  }

  nameInputEnabler(): void {
    this.nameInputEnabled = true;
  }

  submitNewView(name) {
    console.log(name);
    this.bs.addNewView(this.board._id, name)
      .subscribe((b) => {
        console.log('new view added to board');
        console.log(this.board);
        this.board = b;
      });
  }

  toggleShowNewViewForm() {
    this.showNewViewForm = !this.showNewViewForm;
  }

  onChangeViewSelector(view) {
    console.log(view);
    this.selectedView = view;
  }

  onChangeMapperSelector(view) {
    console.log(view);
    this.selectedMapper = view;
  }
}
