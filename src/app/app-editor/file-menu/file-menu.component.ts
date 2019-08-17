import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'ix-angular-elements';
import { AppStateService } from 'src/app/app-state.service';
import { FlowStateService } from '../flows/flow-state.service';

@Component({
  selector: 'file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.scss']
})
export class FileMenuComponent implements OnInit {

  constructor(private state: AuthStateService, 
    private flowState: FlowStateService,
    private appState: AppStateService) { }

  ngOnInit() {
  }

  run() {
    window.open("/play/" + this.flowState.getAppId() + "?debug=true", "_blank");
  }

  showPublishAppModal() {
    this.appState.isPublishAppModalVisible = true;
  }

  showSettingsModal() {
    this.appState.isSettingsModalVisible = true;
  }
}
