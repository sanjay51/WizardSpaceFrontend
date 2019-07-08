import { PostAPI, Resource } from 'ix-angular-elements';
import { Utils } from '../../utils';
export class SignupAPI extends PostAPI {
    public static API_NAME: string = "signup";

    fname: string;
    lname: string;
    email: string;
    password: string;

    constructor(fname: string, lname: string, email: string, password: string) {
        super();
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
    }

    getBody() {
        return {
            "fname": this.fname,
            "lname": this.lname,
            "email": this.email,
            "password": this.password
        }
    }    
    
    validate() {
        Utils.assertNotEmpty(this.fname, "fname");
        Utils.assertNotEmpty(this.lname, "lname");
        Utils.assertNotEmpty(this.email, "email");
        Utils.assertNotEmpty(this.password, "password");
    }
    
    getResource(): Resource {
        return new Resource("users");
    }
}