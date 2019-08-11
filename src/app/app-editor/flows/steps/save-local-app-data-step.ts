import { State, Step } from 'ix-angular-elements';
import { AppData, FlowStateService } from '../flow-state.service';

export class SaveLocalAppDataStep extends Step {

    private constructor(private flowStateService: FlowStateService) {
        super("saveLocalAppData");
    }

    public static get(flowState: FlowStateService): SaveLocalAppDataStep {
        return new SaveLocalAppDataStep(flowState);
    }

    init(): void {
        // do nothing
    }

    async execute(state: State): Promise<string> {
        let data = new AppData();
        let appId = this.flowStateService.getFlowState().get("appId");

        if (this.flowStateService.dataHolders["html"].data) {
            data.html = this.flowStateService.dataHolders["html"].data;
            data.css = this.flowStateService.dataHolders["css"].data;
            data.js = this.flowStateService.dataHolders["js"].data;
            data.readme = this.flowStateService.dataHolders["readme"].data;
        }

        localStorage.setItem(this.flowStateService.getAppDataKey(appId), JSON.stringify(data));
        return "saved";
    }
}