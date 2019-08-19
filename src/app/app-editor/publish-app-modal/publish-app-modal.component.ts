import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'ix-angular-elements';
import { AppStateService } from '../../app-state.service';

@Component({
  selector: 'publish-app-modal',
  templateUrl: './publish-app-modal.component.html',
  styleUrls: ['./publish-app-modal.component.scss']
})
export class PublishAppModalComponent implements OnInit {
  screen = Screen.INITIAL;
  Screen = Screen;

  constructor(private appState: AppStateService, private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  close() {
    this.setModalVisibility(false);
    this.screen = Screen.INITIAL;
  }

  initialScreenContinue() {
    if (this.authentication.isLoggedIn()) {

    }
    this.screen = Screen.MUST_LOGIN;
  }

  setModalVisibility(isVisible: boolean) {
    this.appState.isPublishAppModalVisible = isVisible;
  }
}

enum Screen {
  INITIAL, MUST_LOGIN, LOADING_APP_INFO, PUBLISH, SUCCESS
}