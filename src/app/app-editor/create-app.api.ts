import { PostAPI, Resource } from 'ix-angular-elements';
export class CreateAppAPI extends PostAPI {
    public static API_NAME: string = "createApp";

    userId: string;
    authId: string;
    name: string;

    constructor(userId: string, authId: string, name: string) {
        super();
        this.userId = userId;
        this.authId = authId;
        this.name = name;
    }

    getBody() {
        return {
            "userId": this.userId,
            "authId": this.authId,
            "name": this.name
        }
    }    
    
    validate() {
    }
    
    getResource(): Resource {
        return new Resource("apps");
    }
}