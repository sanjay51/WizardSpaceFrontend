import { State, Step } from 'ix-angular-elements';
import { AppData, FlowStateService } from '../flow-state.service';

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

    async execute(state: State): Promise<string> {
        let data = new AppData();

        if (this.flowState.dataHolders["html"].data) {
            data.html = this.flowState.dataHolders["html"].data;
            data.css = this.flowState.dataHolders["css"].data;
            data.js = this.flowState.dataHolders["js"].data;
            data.readme = this.flowState.dataHolders["readme"].data;
        }

        localStorage.setItem("appData", JSON.stringify(data));
        return "saved";
    }
}