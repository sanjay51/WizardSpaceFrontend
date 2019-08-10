import { State, Step } from 'ix-angular-elements';
import { AppData, FlowStateService } from '../flow-state.service';

export class GetLocalAppDataStep extends Step {

    private constructor(private flowStateService: FlowStateService) {
        super("getLocalAppData");
    }

    public static get(flowStateService: FlowStateService): GetLocalAppDataStep {
        return new GetLocalAppDataStep(flowStateService);
    }

    init(): void {
        // do nothing
    }    
    
    /**
     * Load appData from localStorage, populate FlowStateService's editorDataHolders
     */
    async execute(state: State): Promise<string> {
        if (! state.get("appData")) {
            let appData: AppData = JSON.parse(localStorage.getItem("appData"));
            
            if (! appData) {
                return "failed";
            }
            
            this.flowStateService.dataHolders["html"].setData(appData.html);
            this.flowStateService.dataHolders["css"].setData(appData.css);
            this.flowStateService.dataHolders["js"].setData(appData.js);
            this.flowStateService.dataHolders["readme"].setData(appData.readme);

            state.set("appData", appData);
        }

        return "success";
    }
}