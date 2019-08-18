import { PatchAPI, Resource } from 'ix-angular-elements';
export class UpdateAppAPI extends PatchAPI {
    public static API_NAME: string = "createApp";

    appId: string;
    name: string;
    description: string;
    category: string;
    logo: string;
    images: string[];
    userId: string;
    authId: string;

    constructor(appId: string, name: string, description: string, category: string,
            logo: string, images: string[], userId: string, authId: string) {
        super();
        this.appId = appId;
        this.name =  name;
        this.description = description;
        this.category = category;
        this.logo = logo;
        this.images = images;
        this.userId = userId;
        this.authId = authId;
    }

    getBody() {
        return {
            "appName": this.name,
            "description": this.description,
            "category": this.category,
            "logo": this.logo,
            "images": this.images,
            "userId": this.userId,
            "authId": this.authId,
        }
    }
    
    validate() {
    }
    
    getResource(): Resource {
        return new Resource("apps/" + this.appId);
    }
}