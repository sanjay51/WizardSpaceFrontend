import { PostAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../utils';
export class ReportBugAPI extends PostAPI {
    public static API_NAME: string = "reportBug";

    title: string;
    details: string;
    email: string;
    userId: string;
    authId: string;

    constructor(title: string, details: string, email: string, userId: string, authId: string) {
        super();
        this.title = title;
        this.details = details;
        this.email = email;
        this.userId = userId;
        this.authId = authId;
    }

    getBody() {
        return {
            "domain": "BUG_REPORTS",
            "key": this.email,
            "value": JSON.stringify({
                "email": this.email,
                "userId": this.userId,
                "details": this.details,
                "title": this.title
            }),
            "userId": this.userId,
            "authId": this.authId
        }
    }    
    
    validate() {
        Utils.assertNotEmpty(this.title, "title");
        Utils.assertNotEmpty(this.email, "email");
    }
    
    getResource(): Resource {
        return new Resource("kv");
    }
}