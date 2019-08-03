import { Injectable } from '@angular/core';
import { Flow } from 'ix-angular-elements';
import { FlowStateService } from './flow-state.service';
import { CheckIfOnlineStep } from './steps/check-if-online-step';
import { GetLocalAppDataStep } from './steps/get-local-app-data-step';
import { GetLocalAppIdStep } from './steps/get-local-app-id-step';
import { IdleStep } from './steps/idle-step';

@Injectable({
  providedIn: 'root'
})
export class InitFlowService {
  private flow: Flow;

  constructor(private flowState: FlowStateService) {
    this.flow = new Flow(IdleStep.get(), this.flowState.getInitFlowState());
    this.flow.addTransition(IdleStep.get(), "initialized", GetLocalAppIdStep.get());

    this.flow.addTransition(GetLocalAppIdStep.get(), "success", GetLocalAppDataStep.get());
    this.flow.addTransition(GetLocalAppIdStep.get(), "failed", GetLocalAppDataStep.get());

    this.flow.addTransition(GetLocalAppDataStep.get(), "success", CheckIfOnlineStep.get());
    this.flow.addTransition(GetLocalAppDataStep.get(), "failed", CheckIfOnlineStep.get());
  }

  start() {
    this.flow.invoke();
  }
}
