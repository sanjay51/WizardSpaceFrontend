import { App } from './app-editor/app';

export class Utils {
    static assertNotNull(target: any, label: string) {
        if (!target) throw new Error(label + " validation failed.");
    }

    static assertNotEmpty(target: any, label: string) {
        if ((!target) || (target.length == 0)) throw new Error(label + " validation failed.");
    }

    static parseEpochToDate(epoch: number) {
        let todayEpoch = new Date().getTime()
        return Math.round(((todayEpoch - epoch)) / (24 * 60 * 60 * 1000))
    }

    static launchApp(app: App) {
        if (app.isExternalApp()) {
          window.open(app.appLink);
        } else {
          window.open("/play/" + app.appId, "_blank");
        }
    }
}