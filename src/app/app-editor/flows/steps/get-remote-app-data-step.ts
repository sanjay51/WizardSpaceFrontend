import { APIService, State, Step } from 'ix-angular-elements';
import { FlowStateService } from '../flow-state.service';
import { GetBigKvAPI } from '../get-big-kv.api';

export class GetRemoteAppDataStep extends Step {
    isLoading = false;

    private constructor(private flowStateService: FlowStateService, private apiService: APIService) {
        super("getRemoteAppData");
    }

    public static get(flowStateService: FlowStateService, apiService: APIService): GetRemoteAppDataStep {
        return new GetRemoteAppDataStep(flowStateService, apiService);
    }

    init(): void {
        // do nothing
    }    
    
    /**
     * Load appData from localStorage, populate FlowStateService's editorDataHolders
     */
    async execute(state: State): Promise<string> {
        if (this.isLoading) return "loading";
        console.log('start')
        
        this.isLoading = true;
        if (! state.get("appId")) {
            return "failed";
        }

        let api: GetBigKvAPI = new GetBigKvAPI(null, null, "test-data", "sanjay");
        
        let result = "failed";
        await this.apiService.call(api).toPromise().then(
            response => {
                console.log(response);
                this.isLoading = false;
                result = "success"
            },
            error => {
                console.log(error); 
                this.isLoading = false;
                result = "failed"; 
            }
        )

        this.isLoading = false;
        console.log('end')

        return result;
    }
}