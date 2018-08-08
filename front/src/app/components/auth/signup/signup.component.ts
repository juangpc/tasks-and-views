import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private ss: SessionService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(newUser) {
    // console.log(newUser);
    this.ss.signup(newUser)
      .subscribe((user: any) => {
        // console.log(`WELCOME USER ${user.username}, register OK`);
        // console.log(user);
        this.router.navigate(['/boards']);
      });

  }

}
