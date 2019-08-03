import { State, Step } from 'ix-angular-elements';

export class GetLocalAppDataStep extends Step {
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