import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, State, Step } from 'ix-angular-elements';
import { FlowStateService } from '../flow-state.service';

export class AppIdResolverStep extends Step {

    private static INSTANCE: AppIdResolverStep = null;

    private constructor(private route: ActivatedRoute,
        private authentication: AuthenticationService,
        private flowStateService: FlowStateService) {
        super("getLocalAppId");
    }

    public static get(route: ActivatedRoute, auth: AuthenticationService, flowStateService: FlowStateService): AppIdResolverStep {
        if (!this.INSTANCE) this.INSTANCE = new AppIdResolverStep(route, auth, flowStateService);

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
        if (this.authentication.isLoggedIn()) {
            // get draft app from remote
        }

        /* Most recently updated app wins */
        let appId = null;
        let appVersion = null;
        let initSource = "local";
        if (remoteAppId && remoteAppVersion >= localAppVersion) {
            appId = remoteAppId;
            appVersion = remoteAppVersion;
            initSource = "remote";
        } else {
            appId = localAppId;
            appVersion = localAppVersion;
            initSource = "local";
        }

        // first time user
        if (!appId) {
            appId = "draft";
            appVersion = 0;
        }

        state.set("appId", appId);
        state.set("initSource", initSource);
        state.set(this.flowStateService.getAppVersionKey(appId), appVersion);
        return "success";
    }
}