import { PatchAPI, Resource } from 'ix-angular-elements';
export class UpdateAppAPI extends PatchAPI {
    public static API_NAME: string = "createApp";

    appId: string;
    description: string;
    userId: string;
    authId: string;

    constructor(appId: string, description: string, userId: string, authId: string) {
        super();
        this.appId = appId;
        this.description = description;
        this.userId = userId;
        this.authId = authId;
    }

    getBody() {
        return {
            "description": this.description,
            "userId": this.userId,
            "authId": this.authId,
        }
    }
    
    validate() {
    }
    
    getResource(): Resource {
        return new Resource("apps/" + this.appId);
    }
}