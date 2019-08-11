import { State, Step } from 'ix-angular-elements';
import { AppData, FlowStateService } from '../flow-state.service';

export class AppDataResolverStep extends Step {
    private static INSTANCE: AppDataResolverStep = null;

    private constructor(private fss: FlowStateService) {
        super("getLocalAppData");
    }

    public static get(flowStateService: FlowStateService): AppDataResolverStep {
        if (!this.INSTANCE) this.INSTANCE = new AppDataResolverStep(flowStateService);

        return this.INSTANCE;
    }

    init(): void {
        // do nothing
    }

    /**
     * Load appData from localStorage, populate FlowStateService's editorDataHolders
     */
    async execute(state: State): Promise<string> {
        let appId = this.fss.getAppId();
        let appDataKey = this.fss.getAppDataKey(appId);
        let initSource = this.fss.getFlowState().get("initSource");

        // Is App Data already loaded?
        if (state.get(appDataKey)) {
            return "success";
        }

        let appData: AppData = null;
        if (initSource == "first-time") {
            // first time user
            appData = new AppData();
            appData.html = this.getFirstTimeTutorialData();
        } else if (initSource == "local") {
            // data already in local
            appData = JSON.parse(localStorage.getItem(appDataKey));
        } else {
            // get from remote
        }

        // Populate App Data
        this.fss.dataHolders["html"].setData(appData.html);
        this.fss.dataHolders["css"].setData(appData.css);
        this.fss.dataHolders["js"].setData(appData.js);
        this.fss.dataHolders["readme"].setData(appData.readme);

        // Update state
        state.set(appDataKey, appData);

        return "success";
    }

    getFirstTimeTutorialData() {
        return "<h1>Learn how to use live app editor</h1> \n\
    This is a quick tutorial. Type in the editor (left) to see your changes rendered live (on the right). \n\
    <h3>1. You can use any HTML tags, including h1, h2, a, div etc.</h3> Example: \n\
     \n\
    <h1>h1</h1> <h2>h2</h2> <h3>h3</h3> <h4>h4</h4> <h5>h5</h5> <h6>h6</h6> \n\
    <a href='google.com' target='_blank'>a link to google.com</a>  \n\
    <br/> \n\
    <h3>2. Auto-save</h3> \n\
    All changes are automatically saved in your browser, so even if you refresh this page, your changes will not be lost.<br/> \n\
    <br/> \n\
    <h3>3. You can even create and use CSS style templates</h3> \n\
    <style>\n\
        .my-div {\n\
            color: white;\n\
            background-color: gray;\n\
            display: inline-block;\n\
            padding: 5px;\n\
            box-shadow: 0px 0px 5px gray;\n\
        }\n\
    </style> \n\
    <div class='my-div'>Hey this is my div from ixTutor.com</div>\n\
    <br/><br/>\n\
    <h3>4. Even with your own javascript</h3>\n\
    <button onclick=\"alert(\'Hello from ixTutor.com\')\">Say Hello!</button> \n\
    <br/>\n\
    Note: Errors, if any, are logged in your browser console.<br/>\n\
    <br/>";
    }
}