import { ActivatedRoute } from '@angular/router';
import { APIService, AuthenticationService, State, Step } from 'ix-angular-elements';
import { GetAppByIdAPI } from '../api/get-app-by-id.api';
import { GetAppsByDevIdAPI } from '../api/get-apps-by-dev-id.api';
import { FlowStateService } from '../flow-state.service';

export class AppInfoResolverStep extends Step {

    private static INSTANCE: AppInfoResolverStep = null;

    private constructor(private route: ActivatedRoute,
        private authentication: AuthenticationService,
        private flowStateService: FlowStateService,
        private apiService: APIService) {
        super("AppInfoResolverStep");
    }

    public static get(route: ActivatedRoute,
        auth: AuthenticationService,
        flowStateService: FlowStateService, apiService: APIService): AppInfoResolverStep {
        if (!this.INSTANCE) this.INSTANCE = new AppInfoResolverStep(route, auth, flowStateService, apiService);

        return this.INSTANCE;
    }

    init(): void {
        // do nothing
    }

    /**
     * local == remote => pick later version
     * local == draft, remote = something => pick later version
     * local == null, remote == null => create new (draft)
     * local == null, remote != null => pick remote
     * local != remote => pick later version (timestamp)
     */
    async execute(state: State): Promise<string> {
        let localAppId = state.get("appId");
        let localAppVersion: number = +state.get("appVersion");
        if (localAppId) return "success"; /* e.g. if it was set from url */

        /* Get appId from local */
        if (localStorage.getItem("appId")) {
            localAppId = localStorage.getItem("appId");
            localAppVersion = +localStorage.getItem(this.flowStateService.getAppVersionKey(localAppId));
        }

        let remoteAppId: string = null;
        let remoteAppVersion: number = 0;
        /* Check online next, if user is logged in */
        if (localAppId != "draft" && this.authentication.isLoggedIn()) {
            // only get appId, appVersion from remote, if local is either null or non-draft
            let remoteApp: App;
            if (localAppId == null) {
                remoteApp = await this.getLatestDraftByUser();
            } else {
                remoteApp = await this.getRemoteApp(localAppId);
            }

            remoteAppId = remoteApp.appId;
            remoteAppVersion = remoteApp.appVersion;
        }

        let appId = null;
        let appVersion = null;
        let initSource = "local";
        if (localAppId == null && remoteAppId == null) {
            // first time user
            appId = "draft";
            appVersion = 0;
            initSource = "first-time"
        } else if (localAppId == "draft") {
            // local already contains a draft without appId
            appId = "draft"
            appVersion = 0;
            initSource = "local";
        } else if (remoteAppId == null) {
            // assign this appId under my account; 
            appId = localAppId;
            appVersion = localAppVersion;
            initSource = "local"
            //TODO: call(): assign this appId under my account;
        } else if (localAppVersion > remoteAppVersion) {
            // do nothing; save() will update remote later
            appId = localAppId;
            appVersion = localAppVersion;
            initSource = "local";
        } else {
            appId = remoteAppId
            appVersion = remoteAppVersion
            initSource = "remote"
        }

        state.set("appId", appId);
        state.set("initSource", initSource);
        state.set(this.flowStateService.getAppVersionKey(appId), appVersion);
        return "success";
    }

    async getRemoteApp(appId: string): Promise<App> {
        let userId = this.authentication.state.getAuthStateAttribute("userId");
        let authId = this.authentication.state.getAuthStateAttribute("authId");
        let api = new GetAppByIdAPI(appId, userId, authId);

        let app = new App(null, null);
        let x = await this.apiService.call(api).toPromise()
            .then(
                response => {
                    console.log(response);
                    app.appId = response.appId;
                    app.appVersion = response.draftVersion;
                })
            .catch(error => {
                console.log(error);
            });

        return app;
    }

    async getLatestDraftByUser(): Promise<App> {
        let userId = this.authentication.state.getAuthStateAttribute("userId");
        let authId = this.authentication.state.getAuthStateAttribute("authId");
        let api = new GetAppsByDevIdAPI(userId, authId);

        let app: App = new App(null, null);
        let x = await this.apiService.call(api).toPromise()
            .then(
                response => {
                    console.log(response);
                    app = this.findMostRecentApp(response);
                    console.log(app);
                })
            .catch(error => {
                console.log(error);
            });

        return app;
    }

    findMostRecentApp(arr: Array<any>): App {
        let app = arr[0]
        for (let e of arr) {
            if (e.draftVersion && e.draftVersion > app.draftVersion) {
                app = e;
            }
        }

        return new App(app.appId, app.draftVersion)
    }
}

class App {
    appId: string;
    appVersion: number;

    constructor(appId: string, appVersion: number) {
        this.appId = appId;
        this.appVersion = appVersion;
    }
}
