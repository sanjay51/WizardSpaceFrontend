import { State, Step } from 'ix-angular-elements';
import { FlowStateService } from '../flow-state.service';

export class SaveLocalAppDataStep extends Step {

    private constructor(private flowState: FlowStateService) {
        super("saveLocalAppData");
    }

    public static get(flowState: FlowStateService): SaveLocalAppDataStep {
        return new SaveLocalAppDataStep(flowState);
    }
    
    init(): void {
        // do nothing
    }
    
    execute(state: State): string {
        let data = {};

        Object.keys(this.flowState.dataHolders).forEach(type => {
            data[type] = this.flowState.dataHolders[type].data;
        });

        localStorage.setItem("appData", JSON.stringify(data));
        return "saved";
    }
}