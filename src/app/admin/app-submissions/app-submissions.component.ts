import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'ix-angular-elements';
import { ROUTE_ADMIN } from 'src/app/constants';

@Component({
  selector: 'app-submissions',
  templateUrl: './app-submissions.component.html',
  styleUrls: ['./app-submissions.component.scss']
})
export class AppSubmissionsComponent implements OnInit {

  constructor(private state: AuthStateService) { }

  ngOnInit() {
  }

  gotoAdminHome() {
    this.state.navigateTo(ROUTE_ADMIN);
  }

}
