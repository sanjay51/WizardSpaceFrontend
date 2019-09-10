import { HttpParams } from '@angular/common/http';
import { GetAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../utils';

export class GetLiveAppByIdAPI extends GetAPI {
    public static API_NAME: string = "getLiveAppById";

    appId: string;
    appGroupId: string;
    userId: string;
    authId: string;

    constructor(appId: string, appGroupId: string, userId: string, authId: string) {
        super();
        this.appId = appId;
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
        Utils.assertNotEmpty(this.appId, "appId");
    }
    
    getResource(): Resource {
        return new Resource("/app-group/" + this.appGroupId + "/app/" + this.appId);
    }
}