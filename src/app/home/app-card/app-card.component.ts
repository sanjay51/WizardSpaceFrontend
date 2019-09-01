import { Component, Input, OnInit } from '@angular/core';
import { App } from 'src/app/app-editor/app';
import { AuthStateService } from 'ix-angular-elements';
import { ROUTE_APP_SUBMISSIONS, ROUTE_APP_DETAILS } from 'src/app/constants';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {
  @Input() app: App;

  constructor(private state:AuthStateService) { }

  ngOnInit() {
  }

  gotoAppDetailsPage() {
    this.state.navigateTo(ROUTE_APP_DETAILS + "/" + this.app.appId);
  }

  runApp() {
    window.open("/play/" + this.app.appId, "_blank");
  }

}
