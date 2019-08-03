import { State, Step } from 'ix-angular-elements';

export class IdleStep extends Step {
    init(): void {
        // do nothing
    }    
    
    execute(state: State): string {
        return "initialize";
    }
}