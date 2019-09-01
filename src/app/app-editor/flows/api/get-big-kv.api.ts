import { HttpParams } from '@angular/common/http';
import { GetAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../../../utils';
export class GetBigKvAPI extends GetAPI {
    public static API_NAME: string = "getBigKv";

    domain: string;
    key: string;
    userId: string;
    authId: string;

    constructor(userId: string, authId: string, domain: string, key: string) {
        super();
        this.userId = userId;
        this.authId = authId;

        this.domain = domain;
        this.key = key;
    }

    getParams(): HttpParams {
        let params = new HttpParams()
        .set("domain", this.domain)
        .set("key", this.key)

        return params;
    }
    
    validate() {
        Utils.assertNotEmpty(this.domain, "domain");
        Utils.assertNotEmpty(this.key, "key");
    }
    
    getResource(): Resource {
        return new Resource("big-kv");
    }
}