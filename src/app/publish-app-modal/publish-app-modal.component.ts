import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'publish-app-modal',
  templateUrl: './publish-app-modal.component.html',
  styleUrls: ['./publish-app-modal.component.scss']
})
export class PublishAppModalComponent implements OnInit {

  constructor(private appState: AppStateService) { }

  ngOnInit() {
  }

  setModalVisibility(isVisible: boolean) {
    this.appState.isPublishAppModalVisible = isVisible;
  }
}
