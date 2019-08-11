import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService, AuthenticationService, FinishedStep, Flow } from 'ix-angular-elements';
import { FlowStateService } from './flow-state.service';
import { AppDataResolverStep } from './steps/app-data-resolver-step';
import { AppIdResolverStep } from './steps/app-id-resolver-step';
import { OnlineStatusResolverStep } from './steps/online-status-resolver-step';
import { RefreshViewStep } from './steps/refresh-view-step';

@Injectable({
  providedIn: 'root'
})
export class InitFlowService {
  private flow: Flow;

  constructor(private flowStateService: FlowStateService,
    private apiService: APIService, private route: ActivatedRoute, private auth: AuthenticationService) {

    let onlineStatusResolverStep = OnlineStatusResolverStep.get();
    let appIdResolverStep = AppIdResolverStep.get(this.route, this.auth, this.flowStateService);
    let appDataResolverStep = AppDataResolverStep.get(this.flowStateService);
    let refreshViewStep = RefreshViewStep.get(this.flowStateService);
    let finishedStep = FinishedStep.get();

    // Create flow with 'OnlineStatusResolverStep' as first step.
    this.flow = new Flow(onlineStatusResolverStep, this.flowStateService.getFlowState());

    // Resolve App Id
    this.flow.addTransition(onlineStatusResolverStep, "yes", appIdResolverStep);

    // Resolve App Data
    this.flow.addTransition(appIdResolverStep, "success", appDataResolverStep);

    // Update / Refresh view
    this.flow.addTransition(appDataResolverStep, "success", refreshViewStep);

    // Finished!
    this.flow.addTransition(refreshViewStep, "refreshed", finishedStep);
  }

  async start() {
    await this.flow.invoke();
  }
}
