import { State, Step } from 'ix-angular-elements';

export class GetLocalAppIdStep extends Step {

    private constructor() {
        super("getLocalAppId");
    }

    public static get(): GetLocalAppIdStep {
        return new GetLocalAppIdStep();
    }
    
    init(): void {
        // do nothing
    }    
    
    async execute(state: State): Promise<string> {
        if (! state.get("appId")) {
            let appId = localStorage.getItem("appId");
            if (! appId) {
                return "failed";
            }

            state.set("appId", appId);
        }

        return "success";
    }
}