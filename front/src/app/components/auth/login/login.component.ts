import { Component, OnInit } from '@angular/core';
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
  }

  submitForm(userLog) {
    this.ss.login(userLog)
      .subscribe((user: any) => {
        // console.log(`WELCOME USER ${user.username}, register OK`);
        this.router.navigate(['/boards']);
      });
  }

}
