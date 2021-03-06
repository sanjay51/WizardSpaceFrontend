import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService, APIService } from 'ix-angular-elements';
import { GetAppByIdAPI } from '../app-editor/flows/api/get-app-by-id.api';
import { ActivatedRoute } from '@angular/router';
import { App } from '../app-editor/app';
import { LOADING_GIF_SRC } from '../constants';
import { GetLiveAppByIdAPI } from './get-live-app-by-id.api';
import { Utils } from '../utils';

@Component({
  selector: 'app-app-details-page',
  templateUrl: './app-details-page.component.html',
  styleUrls: ['./app-details-page.component.scss']
})
export class AppDetailsPageComponent implements OnInit, AfterViewInit {
  public app: App;
  public status = "loading";
  public LOADING_GIF_SRC = LOADING_GIF_SRC;

  constructor(private authentication: AuthenticationService, private route: ActivatedRoute,
    private apiService: APIService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let appId = this.route.snapshot.params.appId;
    console.log(appId);

    let userId = this.authentication.state.getAuthStateAttribute("userId");
    let authId = this.authentication.state.getAuthStateAttribute("authId");
    let api = new GetLiveAppByIdAPI(appId, "LIVE_APPS", userId, authId);
    this.apiService.call(api).toPromise().then(response => {
      console.log(response);
      this.app = App.fromAppGroupResponse(response.appData);
      console.log(this.app);
      this.status = "ready";
    }).catch(error => {
      console.log(error);
      this.status = 'error'
    });
  }

  launchApp() {
    Utils.launchApp(this.app);
  }

}
