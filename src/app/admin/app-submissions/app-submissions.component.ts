import { Component, OnInit } from '@angular/core';
import { APIService, AuthStateService } from 'ix-angular-elements';
import { App } from '../../app-editor/app';
import { GetAppsSubmissionsAPI } from './get-apps-by-group.api';
import { PublishAppAPI } from './publish-app.api';
import { LOADING_GIF_SRC, ROUTE_ADMIN } from '../../constants';

@Component({
  selector: 'app-submissions',
  templateUrl: './app-submissions.component.html',
  styleUrls: ['./app-submissions.component.scss']
})
export class AppSubmissionsComponent implements OnInit {
  LOADING_GIF_SRC: string = LOADING_GIF_SRC;
  status = 'loading';

  submissions = [];

  constructor(private state: AuthStateService, private apiService: APIService) { }

  ngOnInit() {
    this.getAppSubmissions();
  }

  gotoAdminHome() {
    this.state.navigateTo(ROUTE_ADMIN);
  }

  async approveSubmission(submission) {
    let app: App = JSON.parse(submission.value);
    
    console.log(app);
    console.log(app.devId);
    let userId = this.state.getAuthStateAttribute("userId");
    let authId = this.state.getAuthStateAttribute("authId");

    let api = new PublishAppAPI(app.appId, userId, authId);
    this.apiService.call(api).toPromise().then(response => {
      console.log(response);
    }).catch(error => console.log(error));
  }

  async getAppSubmissions() {
    this.status = 'loading';

    let userId = this.state.getAuthStateAttribute("userId");
    let authId = this.state.getAuthStateAttribute("authId");

    let api = new GetAppsSubmissionsAPI(userId, authId);
    await this.apiService.call(api).toPromise()
      .then(response => {
        console.log(response);
        this.submissions = response;
        this.status = 'loaded';
      })
      .catch(error => console.log(error));
  }

}
