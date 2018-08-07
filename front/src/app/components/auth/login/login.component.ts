import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { SessionService } from '../../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private ss: SessionService,
    private router: Router) { }

  ngOnInit() {
    this.ss.isLogged().subscribe();
  }

  submitForm(userLog) {
    this.ss.login(userLog)
      .subscribe((user: User) => {
        // console.log(`WELCOME USER ${user.username}, register OK`);
        this.router.navigate(['/boards']);
      });
  }

}
