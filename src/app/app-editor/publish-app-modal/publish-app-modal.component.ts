import { Component, OnInit } from '@angular/core';
import { APIService, AuthenticationService } from 'ix-angular-elements';
import { LOADING_GIF_SRC, ROUTE_LOGIN } from 'src/app/constants';
import { AppStateService } from '../../app-state.service';
import { App } from '../app';
import { GetAppByIdAPI } from '../flows/api/get-app-by-id.api';
import { PublishAppAPI } from './publish-app.api';

@Component({
  selector: 'publish-app-modal',
  templateUrl: './publish-app-modal.component.html',
  styleUrls: ['./publish-app-modal.component.scss']
})
export class PublishAppModalComponent implements OnInit {
  screen = Screen.INITIAL;
  Screen = Screen;
  app: App = null;
  LOADING_GIF_SRC = LOADING_GIF_SRC;

  constructor(public appState: AppStateService, 
    private authentication: AuthenticationService, private apiService: APIService) { }

  ngOnInit() {
  }

  close() {
    this.setModalVisibility(false);
    this.screen = Screen.INITIAL;
  }

  gotoLoginPage() {
    this.close();
    this.authentication.state.navigateTo(ROUTE_LOGIN);
  }

  initialScreenContinue() {
    if (! this.authentication.isLoggedIn()) {
      this.screen = Screen.MUST_LOGIN;
      return;
    }

    this.screen = Screen.VERIFYING_APP;
    this.verifyAppName();
  }

  setModalVisibility(isVisible: boolean) {
    this.appState.isPublishAppModalVisible = isVisible;
  }

  openAppSettingsModal() {
    this.setModalVisibility(false);
    this.appState.isSettingsModalVisible = true;
  }

  submitForPublishing() {
    this.screen = Screen.PUBLISHING;
    let userId = this.authentication.state.getAuthStateAttribute("userId");
    let authId = this.authentication.state.getAuthStateAttribute("authId");

    let api = new PublishAppAPI(this.appState.state.getAppId(), this.app, userId, authId);

    this.apiService.call(api).toPromise().then(response => {
      console.log(response);
      this.screen = Screen.PUBLISHED;
    }).catch(error => {
      console.log(error);
      this.screen = Screen.PUBLISHING_ERROR;
    });
  }

  verifyAppName() {
    let userId = this.authentication.state.getAuthStateAttribute("userId");
    let authId = this.authentication.state.getAuthStateAttribute("authId");
    let api = new GetAppByIdAPI(this.appState.state.getAppId(), userId, authId);
    this.apiService.call(api).toPromise().then(response => {
      if (response.appName) {
        this.screen = Screen.READY_TO_PUBLISH;
        this.app = response;
      } else {
        this.screen = Screen.VERIFYING_APP_FAILED;
      }

    }).catch(error => {
      console.log(error);
      this.screen = Screen.VERIFYING_APP_ERROR;
    });
  }

  getApp() {
    return [
      { name: "appName", value: this.app.appName },
      { name: "category", value: this.app.category },
      { name: "description", value: this.app.description },
      { name: "logo", value: this.app.logo },
      { name: "screenshots", value: this.app.images }
    ];
  }
}

enum Screen {
  INITIAL, MUST_LOGIN, VERIFYING_APP, VERIFYING_APP_ERROR, VERIFYING_APP_FAILED, READY_TO_PUBLISH, PUBLISHING, PUBLISHING_ERROR, PUBLISHED,
}