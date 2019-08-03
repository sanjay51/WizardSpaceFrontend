import { State, Step } from 'ix-angular-elements';

export class GetLocalAppId extends Step {
    init(): void {
        // do nothing
    }    
    
    execute(state: State): string {
        if (! state.get("appId")) {
            let appId = localStorage.getItem("appId");
            if (! appId) {
                return "failure";
            }

            state.set("appId", appId);
        }

        return "success";
    }
}