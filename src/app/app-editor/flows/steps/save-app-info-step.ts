import { APIService, AuthenticationService, State, Step } from 'ix-angular-elements';
import { CreateAppAPI } from '../api/create-app.api';
import { UpdateAppAPI } from '../api/update-app.api';
import { FlowStateService } from '../flow-state.service';
import { App } from '../../app';

export class SaveAppInfoStep extends Step {
    private static INSTANCE: SaveAppInfoStep = null;

    private constructor(private flowStateService: FlowStateService,
        private authentication: AuthenticationService, private apiService: APIService) {
        super("SaveAppInfoStep");
    }

    public static get(flowState: FlowStateService, authentication: AuthenticationService, api: APIService): SaveAppInfoStep {
        if (! this.INSTANCE) this.INSTANCE = new SaveAppInfoStep(flowState, authentication, api);
        
        return this.INSTANCE;
    }

    init(): void {
        // do nothing
    }

    async execute(state: State): Promise<string> {
        let appId = this.flowStateService.getAppId();
        let appVersionKey = this.flowStateService.getAppVersionKey(appId);
        let appVersion = +this.flowStateService.getFlowState().get(appVersionKey);
        let newAppVersion = appVersion + 1;

        if (appId == "draft") {
            let remoteApp: App = await this.createRemoteApp();
            
            if (remoteApp.appId) {
                appId = remoteApp.appId;
                newAppVersion = newAppVersion;
            }
        } else {
            // update remote app
            let remoteApp: App = await this.updateRemoteApp(appId);

            if (remoteApp.appId) {
                newAppVersion = remoteApp.draftVersion;
            }
        }
        
        this.flowStateService.flowState.set("appId", appId);
        localStorage.setItem("appId", appId);
        localStorage.setItem(appVersionKey, newAppVersion.toString());

        // save in remote
        return "saved";
    }

    async createRemoteApp(): Promise<App> {
        let userId = this.authentication.state.getAuthStateAttribute("userId");
        let authId = this.authentication.state.getAuthStateAttribute("authId");
        let api = new CreateAppAPI(userId, authId, "untitled");

        let appResponse = null;
        let x = await this.apiService.call(api).toPromise()
            .then(
                response => {
                    appResponse = response;
                    console.log(response);
                })
            .catch(error => {
                console.log(error);
            });

        if (appResponse) {
            return appResponse;
        }

        return new App();
    }

    async updateRemoteApp(appId: string): Promise<App> {
        let userId = this.authentication.state.getAuthStateAttribute("userId");
        let authId = this.authentication.state.getAuthStateAttribute("authId");

        let app: App = new App();
        app.devId = userId;
        app.appId = appId;
        let api = new UpdateAppAPI(appId, app, userId, authId);

        let appResponse = null;
        let x = await this.apiService.call(api).toPromise()
            .then(
                response => {
                    appResponse = response;
                    console.log(response);
                })
            .catch(error => {
                console.log(error);
            });

        if (appResponse) {
            return appResponse;
        }

        return new App();

    }
}