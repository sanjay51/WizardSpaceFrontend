import { Injectable } from '@angular/core';
import { State } from 'ix-angular-elements';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowStateService {
  flowState = new State();
  
  public dataHolders = {
    "html": new EditorDataHolder("devstudio-app-live-editor-data-html"),
    "css": new EditorDataHolder("devstudio-app-live-editor-data-css"),
    "js": new EditorDataHolder("devstudio-app-live-editor-data-js"),
    "readme": new EditorDataHolder("devstudio-app-live-editor-data-readme")
  };

  constructor() { }

  getFlowState(): State {
    return this.flowState;
  }

  getAppId(): string {
    return this.flowState.get("appId");
  }

  getAppDataKey(appId: string): string {
    let appDataKey = "appData-draft";

    if (appId) {
        appDataKey = "appData-" + appId;
    }

    return appDataKey;
  }

  getAppVersionKey(appId: string): string {
    let appVersionKey = "appVersion-draft";

    if (appId) {
      appVersionKey = "appVersion-" + appId;
    }

    return appVersionKey;

  }

  getAppDataFromLocal(appId: string): AppData {
    return JSON.parse(localStorage.getItem(this.getAppDataKey(appId)));
  }
}

export class EditorDataHolder {
  public data: string;
  public localStorageKey: string;
  public dataSubscriber: Subject<string> = new Subject<string>();

  public constructor(localStorageKey: string) {
    this.localStorageKey = localStorageKey;
    this.data = "";
  }

  public setData(data: string) {
    this.data = data;
  }
}

export class AppData {
  html: string;
  css: string;
  js: string;
  readme: string;
}