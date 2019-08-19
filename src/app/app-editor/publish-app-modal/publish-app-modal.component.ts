import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'ix-angular-elements';
import { LOADING_GIF_SRC, ROUTE_LOGIN } from 'src/app/constants';
import { AppStateService } from '../../app-state.service';

@Component({
  selector: 'publish-app-modal',
  templateUrl: './publish-app-modal.component.html',
  styleUrls: ['./publish-app-modal.component.scss']
})
export class PublishAppModalComponent implements OnInit {
  screen = Screen.INITIAL;
  Screen = Screen;
  LOADING_GIF_SRC = LOADING_GIF_SRC;

  constructor(private appState: AppStateService, 
    private authentication: AuthenticationService) { }

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
  }

  setModalVisibility(isVisible: boolean) {
    this.appState.isPublishAppModalVisible = isVisible;
  }
}

enum Screen {
  INITIAL, MUST_LOGIN, VERIFYING_APP, PUBLISH, SUCCESS
}