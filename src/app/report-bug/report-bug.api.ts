import { PostAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../utils';
export class ReportBugAPI extends PostAPI {
    public static API_NAME: string = "reportBug";

    title: string;
    details: string;
    email: string;
    userId: string;

    constructor(title: string, details: string, email: string, userId: string) {
        super();
        this.title = title;
        this.details = details;
        this.email = email;
        this.userId = userId;
    }

    getBody() {
        return {
            "domain": "bug-reports",
            "id": this.email,
            "userId": this.userId,
            "value": JSON.stringify({
                "email": this.email,
                "userId": this.userId,
                "details": this.details,
                "title": this.title
            })
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