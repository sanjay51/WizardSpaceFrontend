import { HttpParams } from '@angular/common/http';
import { GetAPI, Resource } from 'ix-angular-elements';
import { Utils } from './utils';

export class GetAppsByGroupIdAPI extends GetAPI {
    public static API_NAME: string = "getAppsByGroupId";

    appGroupId: string;
    userId: string;
    authId: string;
    pageSize: number;
    paginationHandle: string = "";

    constructor(appGroupId: string, userId: string, authId: string, pageSize: number) {
        super();
        this.appGroupId = appGroupId;
        this.userId = userId;
        this.authId = authId;
        this.pageSize = pageSize;
    }

    withPaginationHandle(paginationHandle: string) {
        this.paginationHandle = paginationHandle;
        return this;
    }

    getParams(): HttpParams {
        let params = new HttpParams()
        .set("userId", this.userId)
        .set("authId", this.authId)
        .set("pageSize", this.pageSize + "")
        .set("paginationHandle", this.paginationHandle)

        return params;
    }
    
    validate() {
        Utils.assertNotEmpty(this.appGroupId, "appGroupId");
    }
    
    getResource(): Resource {
        return new Resource("app-group/" + this.appGroupId);
    }
}