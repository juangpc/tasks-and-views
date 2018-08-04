import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  title = 'Tasks & Views';
  constructor(private ss: SessionService) { }

  ngOnInit() {
  }

}
