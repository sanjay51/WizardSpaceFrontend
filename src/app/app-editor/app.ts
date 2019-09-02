export class App {
    appId: string;
    versionId: number;
    appName: string;
    category: string;
    creationEpoch: number;
    description: string;
    devId: string;
    draftVersion: number;
    images: string[];
    lastUpdatedEpoch: string;
    logo: string;
    video: string;
    isExternal: string = "false";
}

export const APP_CATEGORIES = ["Art & Design", "Auto & Vehicles", "Beauty", "Books & Reference", "Business", "Comics", "Communications", "Dating", "Education", "Entertainment", "Events", "Finance", "Food & Drink", "Games", "Health & Fitness", "House & Home", "Libraries & Demo", "Lifestyle", "Maps & Navigation", "Medical", "Music & Audio", "News & Magazines", "Parenting", "Personalization", "Photography", "Productivity", "Shopping", "Social", "Sports", "Tools", "Travel & Local", "Video Players & Editors", "Weather"];