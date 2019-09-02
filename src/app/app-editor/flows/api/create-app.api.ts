import { PostAPI, Resource } from 'ix-angular-elements';
export class CreateAppAPI extends PostAPI {
    public static API_NAME: string = "createApp";

    userId: string;
    authId: string;
    name: string;
    isExternal: string = "false";

    constructor(userId: string, authId: string, name: string) {
        super();
        this.userId = userId;
        this.authId = authId;
        this.name = name;
    }

    setExternal() {
        this.isExternal = "true";
    }

    getBody() {
        return {
            "userId": this.userId,
            "authId": this.authId,
            "appName": this.name,
            "isExternal": this.isExternal
        }
    }
    
    validate() {
    }
    
    getResource(): Resource {
        return new Resource("apps");
    }
}