import { Utils } from '../../utils';
import { HttpParams } from '@angular/common/http';
export class SignupState {
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    getAsHttpParams() {
        let params = new HttpParams()
        .set("name", this.name)
        .set("email", this.email)
        .set("password", this.password)

        return params;
    }

    validate() {
        Utils.assertNotEmpty(this.name, "name");
        Utils.assertNotEmpty(this.email, "email");
        Utils.assertNotEmpty(this.password, "password");
    }
}