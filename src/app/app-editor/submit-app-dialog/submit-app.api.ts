import { PostAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../../utils';
import { App } from '../app';

export class SubmitAppAPI extends PostAPI {
    public static API_NAME: string = "SubmitApp";

    appId: string;
    app: App;
    userId: string;
    authId: string;

    constructor(appId: string, app: App, userId: string, authId: string) {
        super();
        this.appId = appId;
        this.app = app;
        this.userId = userId;
        this.authId = authId;
    }

    getBody() {
        return {
            "domain": "APP_SUBMISSIONS",
            "key": this.appId,
            "value": JSON.stringify(this.app),
            "userId": this.userId,
            "authId": this.authId
        }
    }    
    
    validate() {
        Utils.assertNotEmpty(this.appId, "appId");
        Utils.assertNotEmpty(this.userId, "userId");
    }
    
    getResource(): Resource {
        return new Resource("kv");
    }
}