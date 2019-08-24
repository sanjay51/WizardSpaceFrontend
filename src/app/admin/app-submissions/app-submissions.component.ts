import { Component, OnInit } from '@angular/core';
import { APIService, AuthStateService, Flow } from 'ix-angular-elements';
import { App } from 'src/app/app-editor/app';
import { GetAppByIdAPI } from 'src/app/app-editor/flows/api/get-app-by-id.api';
import { LOADING_GIF_SRC, ROUTE_ADMIN } from 'src/app/constants';
import { GetAppsSubmissionsAPI } from './get-apps-by-group.api';

@Component({
  selector: 'app-submissions',
  templateUrl: './app-submissions.component.html',
  styleUrls: ['./app-submissions.component.scss']
})
export class AppSubmissionsComponent implements OnInit {
  LOADING_GIF_SRC: string = LOADING_GIF_SRC;
  status = 'loading';

  submissions = [];
  private flow: Flow;

  constructor(private state: AuthStateService, private apiService: APIService) { }

  ngOnInit() {
    this.getAppSubmissions();
  }

  gotoAdminHome() {
    this.state.navigateTo(ROUTE_ADMIN);
  }

  async approveSubmission(submission) {
    /*
    appId: "1930329f-5e1b-49e2-b25f-47180af36058"
    appName: "my first app "
    category: "Productivity"
    creationEpoch: 1566155234658
    description: "asdfasdfasd jjjxx"
    devId: "bd52e962-c5ee-4494-b052-d091e7456194"
    draftVersion: 1566621967820
    images: (2) ["hey hey 2", "asdfasdfasdf"]
    lastUpdatedEpoch: 1566621967820
    logo: "my first app logo"
*/
    let app: App = JSON.parse(submission.value);
    let appId = app.appId;
    let userId = submission.userId;
    
    let x = this.getAppById(app.appId);

    console.log(app);
    console.log(app.devId);
    // get app
    // copy to app group
    // copy s3 files
  }

  async getAppById(appId) {
    this.status = 'loading';
    let userId = this.state.getAuthStateAttribute("userId");
    let authId = this.state.getAuthStateAttribute("authId");
    
    let api = new GetAppByIdAPI(appId, userId, authId);
    this.apiService.call(api).toPromise().then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
      this.status = 'error'
    });
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
