import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  isPublishAppModalVisible = false;
  isSettingsModalVisible = false;

  constructor() { }
}
