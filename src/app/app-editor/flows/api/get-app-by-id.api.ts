import { HttpParams } from '@angular/common/http';
import { GetAPI, Resource } from 'ix-angular-elements';
import { Utils } from 'src/app/utils';

export class GetAppByIdAPI extends GetAPI {
    public static API_NAME: string = "getAppById";

    appId: string;
    userId: string;
    authId: string;

    constructor(appId: string, userId: string, authId: string) {
        super();
        this.appId = appId;
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
        return new Resource("apps/" + this.appId);
    }
}