import { AppMetadata } from './app-metadata';

export class App {
    appId: string;
    versionId: number;
    appName: string;
    category: string;
    creationEpoch: number;
    description: string;
    devId: string;
    appLink: string;
    draftVersion: number;
    images: string[];
    lastUpdatedEpoch: string;
    logo: string;
    video: string;
    isExternal: string = "false";

    isHTTPSEnabled: boolean;
    isOfflineSupported: boolean;
    isAndroidInstallable: boolean;
    isIOSInstallable: boolean;
    lighthouseScore: number;

    public static fromAppGroupResponse(appData: any): App{
        let app: App = new App();

        console.log(appData);
        app.appId = this.get("appId", appData);
        app.appName = this.get("appName", appData);
        app.category = this.get("category", appData);
        app.creationEpoch = +this.get("creationEpoch", appData);
        app.description = this.get("description", appData);
        app.devId = this.get("devId", appData);
        app.appLink = this.get("appLink", appData);
        app.images = this.get("images", appData);
        app.logo = this.get("logo", appData);
        app.video = this.get("video", appData);
        app.isExternal = this.get("isExternal", appData);
    
        app.isHTTPSEnabled = this.get("isHTTPSEnabled", appData) == "true";
        app.isOfflineSupported = this.get("isOfflineSupported", appData) == "true";
        app.isAndroidInstallable = this.get("isAndroidInstallable", appData) == "true";
        app.isIOSInstallable = this.get("isIOSInstallable", appData) == "true";
        app.lighthouseScore = +this.get("lighthouseScore", appData);

        return app;
    }

    static get(att: string, appData: any) {
        if (appData[att] && appData[att].value) return appData[att].value;

        return null;
    }
}

export const APP_CATEGORIES = ["Art & Design", "Auto & Vehicles", "Beauty", "Books & Reference", "Business", "Comics", "Communications", "Dating", "Education", "Entertainment", "Events", "Finance", "Food & Drink", "Games", "Health & Fitness", "House & Home", "Libraries & Demo", "Lifestyle", "Maps & Navigation", "Medical", "Music & Audio", "News & Magazines", "Parenting", "Personalization", "Photography", "Productivity", "Shopping", "Social", "Sports", "Tools", "Travel & Local", "Video Players & Editors", "Weather"];