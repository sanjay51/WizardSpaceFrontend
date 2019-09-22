import { Component, Input, OnInit } from '@angular/core';
import { App } from '../../app-editor/app';
import { AuthStateService } from 'ix-angular-elements';
import { ROUTE_APP_SUBMISSIONS, ROUTE_APP_DETAILS } from '../../constants';
import { Utils } from 'src/app/utils';

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
    Utils.launchApp(this.app);
  }

  trim(str: string, charCount: number) {
    if (!str) return str;
    
    if (str.length < charCount) {
      return str;
    }

    return str.substr(0, charCount - 2) + ".."
  }

}
