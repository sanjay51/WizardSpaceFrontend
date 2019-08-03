import { State, Step } from 'ix-angular-elements';

export class GetLocalAppDataStep extends Step {

    private constructor() {
        super("getLocalAppData");
    }

    public static get(): GetLocalAppDataStep {
        return new GetLocalAppDataStep();
    }

    init(): void {
        // do nothing
    }    
    
    execute(state: State): string {
        if (! state.get("appData")) {
            let appData = JSON.parse(localStorage.getItem("appData"));
            
            if (! appData) {
                return "failure";
            }

            state.set("appData", appData);
        }

        return "success";
    }
}