import { State, Step } from 'ix-angular-elements';
import { FlowStateService } from '../flow-state.service';

export class ResetEditorFirstTimeConditionalStep extends Step {

    private constructor(private flowState: FlowStateService) {
        super("refreshEditor");
    }

    public static get(flowState: FlowStateService): ResetEditorFirstTimeConditionalStep {
        return new ResetEditorFirstTimeConditionalStep(flowState);
    }
    
    init(): void {
        // do nothing
    }    
    
    async execute(state: State): Promise<string> {
        if (!this.flowState.dataHolders['html'].data) {
          this.flowState.dataHolders['html'].data = this.getFirstTimeTutorialData();
        }
        
        return "resetDone";
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