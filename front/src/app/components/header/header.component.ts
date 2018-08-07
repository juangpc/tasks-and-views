import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ss: SessionService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.ss.logout().subscribe();
    this.router.navigate(['/']);
  }

}
