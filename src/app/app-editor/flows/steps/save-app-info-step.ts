import { State, Step } from 'ix-angular-elements';
import { FlowStateService } from '../flow-state.service';

export class SaveAppInfoStep extends Step {
    private static INSTANCE: SaveAppInfoStep = null;

    private constructor(private flowStateService: FlowStateService) {
        super("SaveAppInfoStep");
    }

    public static get(flowState: FlowStateService): SaveAppInfoStep {
        if (! this.INSTANCE) this.INSTANCE = new SaveAppInfoStep(flowState);
        
        return this.INSTANCE;
    }

    init(): void {
        // do nothing
    }

    async execute(state: State): Promise<string> {
        let appId = this.flowStateService.getAppId();
        let appVersionKey = this.flowStateService.getAppVersionKey(appId);
        let appVersion = +this.flowStateService.getFlowState().get(appVersionKey);
        let newAppVersion = appVersion + 1;

        localStorage.setItem("appId", appId);
        localStorage.setItem(appVersionKey, newAppVersion.toString());

        // save in remote
        return "saved";
    }
}