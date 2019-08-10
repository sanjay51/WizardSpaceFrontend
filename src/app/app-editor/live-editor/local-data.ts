export class LocalData {
    appId = {
        value: null,
        isLoaded: false
    };
    appData: string;

    public getAppId(): string {
        if(! this.appId.isLoaded) {
            this.appId.value = localStorage.getItem("appId");
            this.appId.isLoaded = true;
        }

        return this.appId.value;
    }

    public getAppData
}

class LocalVariable {
    value: string;
    isLoaded: boolean;

    constructor() {
        this.value = null;
        this.isLoaded = false;
    }
}