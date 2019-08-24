import { PostAPI, Resource } from 'ix-angular-elements';
import { Utils } from 'src/app/utils';

export class PublishAppAPI extends PostAPI {
    public static API_NAME: string = "publishApp";

    appId: string;
    userId: string;
    authId: string;

    constructor(appId: string, userId: string, authId: string) {
        super();
        this.appId = appId;
        this.userId = userId;
        this.authId = authId;
    }

    getBody() {
        return {
            "appId": this.appId,
            "userId": this.userId,
            "authId": this.authId
        }
    }

    validate() {
        Utils.assertNotEmpty(this.appId, "appId");
        Utils.assertNotEmpty(this.userId, "userId");
        Utils.assertNotEmpty(this.authId, "authId");
    }

    getResource(): Resource {
        return new Resource("publish-apps");
    }
}