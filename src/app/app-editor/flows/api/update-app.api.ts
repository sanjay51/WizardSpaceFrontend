import { PatchAPI, Resource } from 'ix-angular-elements';
import { App } from '../../app';
export class UpdateAppAPI extends PatchAPI {
    public static API_NAME: string = "createApp";

    appId: string;
    userId: string;
    authId: string;
    app: App;

    constructor(appId: string, app: App, userId: string, authId: string) {
        super();
        this.appId = appId;
        this.userId = userId;
        this.authId = authId;
        this.app = app;
    }

    getBody() {
        return {
            "userId": this.userId,
            "authId": this.authId,
            "appId": this.appId,
            "appAttributes": this.app,
        }
    }
    
    validate() {
    }
    
    getResource(): Resource {
        return new Resource("apps/" + this.appId);
    }
}