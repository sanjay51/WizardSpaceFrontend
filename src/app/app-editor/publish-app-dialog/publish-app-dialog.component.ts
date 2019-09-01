import { Component, OnInit, Inject } from '@angular/core';
import { APIService, AuthenticationService } from 'ix-angular-elements';
import { LOADING_GIF_SRC, ROUTE_LOGIN } from '../../constants';
import { AppStateService } from '../../app-state.service';
import { App } from '../app';
import { GetAppByIdAPI } from '../flows/api/get-app-by-id.api';
import { SubmitAppAPI } from './publish-app.api';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AppSettingsDialogComponent } from '../app-settings-dialog/app-settings-dialog.component';

@Component({
  selector: 'publish-app-dialog',
  templateUrl: './publish-app-dialog.component.html',
  styleUrls: ['./publish-app-dialog.component.scss']
})
export class PublishAppDialog implements OnInit {
  screen = Screen.INITIAL;
  Screen = Screen;
  app: App = null;
  LOADING_GIF_SRC = LOADING_GIF_SRC;

  constructor(public appState: AppStateService,
    private authentication: AuthenticationService,
    private apiService: APIService,
    public dialogRef: MatDialogRef<PublishAppDialog>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close() {
    this.screen = Screen.INITIAL;
    this.dialogRef.close();
  }

  openAppSettingsModal() {
    this.close();
    
    const dialogRef = this.dialog.open(AppSettingsDialogComponent, {
      minWidth: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  gotoLoginPage() {
    this.close();
    this.authentication.state.navigateTo(ROUTE_LOGIN);
  }

  initialScreenContinue() {
    if (!this.authentication.isLoggedIn()) {
      this.screen = Screen.MUST_LOGIN;
      return;
    }

    this.screen = Screen.VERIFYING_APP;
    this.verifyAppName();
  }

  submitForPublishing() {
    this.screen = Screen.PUBLISHING;
    let userId = this.authentication.state.getAuthStateAttribute("userId");
    let authId = this.authentication.state.getAuthStateAttribute("authId");

    let api = new SubmitAppAPI(this.appState.state.getAppId(), this.app, userId, authId);

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