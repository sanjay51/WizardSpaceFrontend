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

    public static fromAppGroupResponse(appData: any): App {
        let app: App = new App();

        app.appId = this.get("appId", appData);
        app.appName = this.get("appName", appData);
        app.category = this.get("category", appData);
        app.creationEpoch = +this.get("creationEpoch", appData);
        app.description = this.get("description", appData);
        app.devId = this.get("devId", appData);
        app.appLink = this.get("appLink", appData);
        app.images = JSON.parse(this.get("images", appData));
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

export const ACTIVE_APP_CATEGORIES = [
    { name: "Art & Design", "icon": "filter_vintage", "path": "Art & Design" },
    /*{ name: "Beauty", "icon": "face", "path": "" },*/
    { name: "Books & Reference", "icon": "library_books", "path": "Reference" },
    { name: "Business", "icon": "business", "path": "Business" },
    /* { name: "Comics", "icon": "", "path": ""}, */
    /* { name: "Communications", "icon": "chat", "path": "" }, */
    { name: "Dating", "icon": "favorite", "path": "Dating" },
    { name: "Education", "icon": "school", "path": "Education" },
    { name: "Entertainment", "icon": "movie", "path": "Entertainment" },
    { name: "Events", "icon": "event", "path": "Events" },
    { name: "Finance", "icon": "money", "path": "Finance" },
    { name: "Food & Drink", "icon": "fastfood", "path": "Food & Drink" },
    { name: "Games", "icon": "sports_esports", "path": "Games" },
    { name: "Health & Fitness", "icon": "fitness_center", "path": "Health & Fitness" },
    { name: "House & Home", "icon": "home", "path": "House & Home" },
    /* { name: "Libraries & Demo", "icon": "library_books", "path": ""}, */
    { name: "Lifestyle", "icon": "deck", "path": "Lifestyle" },
    { name: "Maps & Navigation", "icon": "map", "path": "Maps & Navigation" },
    /* { name: "Medical", "icon": "local_hospital", "path": "" }, */
    { name: "Music & Audio", "icon": "music_video", "path": "Music" },
    { name: "News & Magazines", "icon": "group_work", "path": "News" },
    /* { name: "Parenting", "icon": "", "path": ""}, */
    /* { name: "Personalization", "icon": "", "path": ""}, */
    { name: "Photography", "icon": "insert_photo", "path": "Photography" },
    { name: "Productivity Tools", "icon": "waves", "path": "Tools" },
    { name: "Shopping", "icon": "add_shopping_cart", "path": "Shopping" },
    { name: "Social", "icon": "deck", "path": "Social" },
    { name: "Sports", "icon": "sports_football", "path": "Sports" },
    /* { name: "Tools", "icon": "", "path": ""}, */
    { name: "Travel & Local", "icon": "location_city", "path": "Travel" },
    /* { name: "Video Players & Editors", "icon": "", "path": ""}, */
    { name: "Weather", "icon": "wb_sunny", "path": "Weather" }
]

export const APP_CATEGORIES = [
    "Art & Design",
    "Auto & Vehicles",
    "Beauty", "Books & Reference",
    "Business", "Comics", "Communications", "Dating",
    "Education", "Entertainment", "Events", "Finance",
    "Food & Drink", "Games", "Health & Fitness", "House & Home", "Libraries & Demo",
    "Lifestyle", "Maps & Navigation", "Medical", "Music & Audio", "News & Magazines",
    "Parenting", "Personalization", "Photography", "Productivity", "Shopping", "Social",
    "Sports", "Tools", "Travel & Local", "Video Players & Editors", "Weather"
];