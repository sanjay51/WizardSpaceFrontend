import { HttpParams } from '@angular/common/http';
import { GetAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../../../utils';

export class GetAppsByDevIdAPI extends GetAPI {
    public static API_NAME: string = "getAppsByDevId";

    userId: string;
    authId: string;

    constructor(userId: string, authId: string) {
        super();
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
        Utils.assertNotEmpty(this.userId, "userId");
        Utils.assertNotEmpty(this.authId, "authId");
    }
    
    getResource(): Resource {
        return new Resource("apps");
    }
}