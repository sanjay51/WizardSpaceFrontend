import { Injectable } from '@angular/core';
import { FinishedStep, Flow } from 'ix-angular-elements';
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

  constructor(private flowStateService: FlowStateService) {
    this.flow = new Flow(IdleStep.get(), this.flowStateService.getFlowState());
    this.flow.addTransition(IdleStep.get(), "initialized", GetLocalAppIdStep.get());

    this.flow.addTransition(GetLocalAppIdStep.get(), "success", GetLocalAppDataStep.get(this.flowStateService));
    this.flow.addTransition(GetLocalAppIdStep.get(), "failed", GetLocalAppDataStep.get(this.flowStateService));

    this.flow.addTransition(GetLocalAppDataStep.get(this.flowStateService), "success", CheckIfOnlineStep.get());
    this.flow.addTransition(GetLocalAppDataStep.get(this.flowStateService), "failed", CheckIfOnlineStep.get());

    this.flow.addTransition(CheckIfOnlineStep.get(), "yes", FinishedStep.get());
  }

  start() {
    this.flow.invoke();
  }
}
