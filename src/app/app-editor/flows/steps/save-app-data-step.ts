import { State, Step } from 'ix-angular-elements';
import { AppData, FlowStateService } from '../flow-state.service';

export class SaveAppDataStep extends Step {
    private static INSTANCE: SaveAppDataStep = null;

    private constructor(private flowStateService: FlowStateService) {
        super("SaveAppDataStep");
    }

    public static get(flowState: FlowStateService): SaveAppDataStep {
        if (! this.INSTANCE) this.INSTANCE = new SaveAppDataStep(flowState);
        
        return this.INSTANCE;
    }

    init(): void {
        // do nothing
    }

    async execute(state: State): Promise<string> {
        let data = new AppData();
        let appId = this.flowStateService.getFlowState().get("appId");
        let isAppDataChanged = "yes";

        if (this.flowStateService.dataHolders["html"].data) {
            data.html = this.flowStateService.dataHolders["html"].data;
            data.css = this.flowStateService.dataHolders["css"].data;
            data.js = this.flowStateService.dataHolders["js"].data;
            data.readme = this.flowStateService.dataHolders["readme"].data;
        }

        localStorage.setItem(this.flowStateService.getAppDataKey(appId), JSON.stringify(data));
        localStorage.setItem("isAppDataChanged", isAppDataChanged);
        return "saved";
    }
}