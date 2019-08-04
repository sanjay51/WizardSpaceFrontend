import { State, Step } from 'ix-angular-elements';
import { FlowStateService } from '../flow-state.service';

export class RefreshViewStep extends Step {

    private constructor(private flowState: FlowStateService) {
        super("refreshView");
    }
  
    public static get(flowState: FlowStateService): RefreshViewStep {
        return new RefreshViewStep(flowState);
    }
    
    init(): void {
        // do nothing
    }    
    
    execute(state: State): string {
      let sanitizedData = '<style> ' + this.flowState.dataHolders['css'].data + ' </style> ' +
        '<script> ' + this.flowState.dataHolders['js'].data + ' </script> ' +
        this.flowState.dataHolders['html'].data
  
      var iframe = document.getElementById('iframeview') as HTMLIFrameElement;
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(sanitizedData);
      iframe.contentWindow.document.close();
  
      return "refreshed";
    }
}