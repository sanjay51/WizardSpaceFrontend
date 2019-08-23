import { HttpParams } from '@angular/common/http';
import { GetAPI, Resource } from 'ix-angular-elements';
import { Utils } from './utils';

export class GetAppsByGroupIdAPI extends GetAPI {
    public static API_NAME: string = "getAppsByGroupId";

    appGroupId: string;
    userId: string;
    authId: string;

    constructor(appGroupId: string, userId: string, authId: string) {
        super();
        this.appGroupId = appGroupId;
        this.userId = userId;
        this.authId = authId;
    }

    getParams(): HttpParams {
        let params = new HttpParams()
        .set("userId", this.userId)
        .set("authId", this.authId)

        return params;
    }
    
    validate() {
        Utils.assertNotEmpty(this.appGroupId, "appGroupId");
    }
    
    getResource(): Resource {
        return new Resource("app-group/" + this.appGroupId);
    }
}