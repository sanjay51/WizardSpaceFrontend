import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, State, Step } from 'ix-angular-elements';
import { FlowStateService } from '../flow-state.service';

export class AppInfoResolverStep extends Step {

    private static INSTANCE: AppInfoResolverStep = null;

    private constructor(private route: ActivatedRoute,
        private authentication: AuthenticationService,
        private flowStateService: FlowStateService) {
        super("getLocalAppInfo");
    }

    public static get(route: ActivatedRoute, auth: AuthenticationService, flowStateService: FlowStateService): AppInfoResolverStep {
        if (!this.INSTANCE) this.INSTANCE = new AppInfoResolverStep(route, auth, flowStateService);

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
        }

        /* Most recently updated app wins */
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
}