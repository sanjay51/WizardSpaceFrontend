import { PostAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../utils';
import { App } from '../app-editor/app';
export class SubmitExternalAppAPI extends PostAPI {
    public static API_NAME: string = "submitExternalApp";

    app: App;
    userId: string;
    authId: string;

    constructor(app: App, userId: string, authId: string) {
        super();
        this.app = app;
        this.userId = userId;
        this.authId = authId;
    }

    getBody() {
        return {
            "domain": "APP_SUBMISSIONS",
            "key": "external",
            "value": JSON.stringify(this.app),
            "userId": this.userId,
            "authId": this.authId
        }
    }    
    
    validate() {
        Utils.assertNotEmpty(this.userId, "userId");
        Utils.assertNotEmpty(this.userId, "authId");
    }
    
    getResource(): Resource {
        return new Resource("kv");
    }
}