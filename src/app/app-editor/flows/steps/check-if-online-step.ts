import { State, Step } from 'ix-angular-elements';

export class CheckIfOnlineStep extends Step {
    init(): void {
        // do nothing
    }    
    
    execute(state: State): string {
        return "yes";
    }
}