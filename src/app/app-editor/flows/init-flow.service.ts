import { Injectable } from '@angular/core';
import { FinishedStep, Flow } from 'ix-angular-elements';
import { FlowStateService } from './flow-state.service';
import { CheckIfOnlineStep } from './steps/check-if-online-step';
import { GetLocalAppDataStep } from './steps/get-local-app-data-step';
import { GetLocalAppIdStep } from './steps/get-local-app-id-step';
import { RefreshViewStep } from './steps/refresh-view-step';
import { ResetEditorFirstTimeConditionalStep } from './steps/reset-editor-first-time-conditional-step';

@Injectable({
  providedIn: 'root'
})
export class InitFlowService {
  private flow: Flow;

  constructor(private flowStateService: FlowStateService) {
    // Create flow with 'GetLocalAppIdStep' as first step.
    this.flow = new Flow(GetLocalAppIdStep.get(), this.flowStateService.getFlowState());

    // Get local App data
    this.flow.addTransition(GetLocalAppIdStep.get(), "success", GetLocalAppDataStep.get(this.flowStateService));
    this.flow.addTransition(GetLocalAppIdStep.get(), "failed", GetLocalAppDataStep.get(this.flowStateService));

    // Check if online
    this.flow.addTransition(GetLocalAppDataStep.get(this.flowStateService), "success", CheckIfOnlineStep.get());
    this.flow.addTransition(GetLocalAppDataStep.get(this.flowStateService), "failed", CheckIfOnlineStep.get());

    // Reset editor for first time use, (conditional) with default html template
    this.flow.addTransition(CheckIfOnlineStep.get(), "yes", ResetEditorFirstTimeConditionalStep.get(this.flowStateService));

    // Refresh View
    this.flow.addTransition(ResetEditorFirstTimeConditionalStep.get(this.flowStateService), "resetDone", RefreshViewStep.get(this.flowStateService));

    // Finish
    this.flow.addTransition(RefreshViewStep.get(this.flowStateService), "refreshed", FinishedStep.get());
  }

  start() {
    this.flow.invoke();
  }
}
