import { PostAPI, Resource } from 'ix-angular-elements';
import { Utils } from 'src/app/utils';
export class SetBigKvAPI extends PostAPI {
    public static API_NAME: string = "setBigKv";

    domain: string;
    key: string;
    value: string;
    userId: string;
    authId: string;

    constructor(userId: string, authId: string, domain: string, key: string, value: string) {
        super();
        this.userId = userId;
        this.authId = authId;

        this.domain = domain;
        this.key = key;
        this.value = value;
    }

    getBody() {
        return {
            "userId": this.userId,
            "authId": this.authId,
            "domain": this.domain,
            "key": this.key,
            "value": this.value
        }
    }
    
    validate() {
        Utils.assertNotEmpty(this.domain, "domain");
        Utils.assertNotEmpty(this.key, "key");
        Utils.assertNotEmpty(this.value, "value");
    }
    
    getResource(): Resource {
        return new Resource("big-kv");
    }
}