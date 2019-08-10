import { ActivatedRoute } from '@angular/router';
import { State, Step } from 'ix-angular-elements';

export class GetLocalAppIdStep extends Step {

    private constructor(private route: ActivatedRoute) {
        super("getLocalAppId");
    }

    public static get(route: ActivatedRoute): GetLocalAppIdStep {
        return new GetLocalAppIdStep(route);
    }

    init(): void {
        // do nothing
    }

    async execute(state: State): Promise<string> {
        if (state.get("appId"))
            return "success";
        
        if (this.route.snapshot.paramMap.get("appId")) {
            state.set("appId", this.route.snapshot.paramMap.get("appId"));
        } else {
            let appId = localStorage.getItem("appId");
            if (!appId) {
                return "failed";
            }

            state.set("appId", appId);
        }

        return "success";
    }
}