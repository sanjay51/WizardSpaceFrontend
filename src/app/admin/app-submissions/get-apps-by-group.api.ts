import { HttpParams } from '@angular/common/http';
import { GetAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../../utils';

export class GetAppsSubmissionsAPI extends GetAPI {
    public static API_NAME: string = "getAppSubmissions";

    domain = "APP_SUBMISSIONS";
    userId: string;
    authId: string;

    constructor(userId: string, authId: string) {
        super();
        this.userId = userId;
        this.authId = authId;
    }

    getParams(): HttpParams {
        let params = new HttpParams()
        .set("domain", this.domain)
        .set("userId", this.userId)
        .set("authId", this.authId)

        return params;
    }
    
    validate() {
        Utils.assertNotEmpty(this.userId, "userId");
        Utils.assertNotEmpty(this.authId, "authId");
    }
    
    getResource(): Resource {
        return new Resource("kv");
    }
}