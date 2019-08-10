import { State, Step } from 'ix-angular-elements';
import { FlowStateService } from '../flow-state.service';

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
            let data = JSON.parse(localStorage.getItem("appData"));
            
            if (! data) {
                return "failed";
            }
            
            Object.keys(data).forEach(type => {
                this.flowStateService.dataHolders[type].setData(data[type]);
            });

            state.set("appData", data);
        }

        return "success";
    }
}