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