import { APIService, AuthenticationService, State, Step } from 'ix-angular-elements';
import { SetBigKvAPI } from '../api/set-big-kv.api';
import { AppData, FlowStateService } from '../flow-state.service';

export class SaveAppDataStep extends Step {
    private static INSTANCE: SaveAppDataStep = null;

    private constructor(private flowStateService: FlowStateService,
        private authentication: AuthenticationService, private apiService: APIService) {
        super("SaveAppDataStep");
    }

    public static get(flowState: FlowStateService,
        authentication: AuthenticationService, apiService: APIService): SaveAppDataStep {
        if (! this.INSTANCE) this.INSTANCE = new SaveAppDataStep(flowState, authentication, apiService);
        
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
        if (appId != "draft") {
            await this.saveInRemote(appId, JSON.stringify(data));
        }

        return "saved";
    }

    async saveInRemote(appId, appData) {
        let userId = this.authentication.state.getAuthStateAttribute("userId");
        let authId = this.authentication.state.getAuthStateAttribute("authId");

        let api: SetBigKvAPI = new SetBigKvAPI(userId, authId, "wz-app-data", appId, appData);
        
        let result = "failed";
        await this.apiService.call(api).toPromise().then(
            response => {
                console.log(response);
                result = "success"
            },
            error => {
                console.log(error);
                result = "failed"; 
            }
        )
    }
}