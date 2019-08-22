import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'ix-angular-elements';
import { ROUTE_APP_SUBMISSIONS } from '../constants';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private state: AuthStateService) { }

  ngOnInit() {
  }

  gotoAppSubmissions() {
    this.state.navigateTo(ROUTE_APP_SUBMISSIONS);
  }

}
