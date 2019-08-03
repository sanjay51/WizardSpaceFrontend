import { Injectable } from '@angular/core';
import { State } from 'ix-angular-elements';

@Injectable({
  providedIn: 'root'
})
export class FlowStateService {
  initFlowState = new State();

  constructor() { }

  getInitFlowState(): State {
    return this.initFlowState;
  }
}
