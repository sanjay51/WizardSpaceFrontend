import { Injectable } from '@angular/core';
import { FlowStateService } from './app-editor/flows/flow-state.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  isPublishAppModalVisible = false;
  isSettingsModalVisible = false;

  constructor(public state: FlowStateService) { }
}
