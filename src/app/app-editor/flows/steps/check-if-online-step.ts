import { State, Step } from 'ix-angular-elements';

export class CheckIfOnlineStep extends Step {
    private constructor() {
        super("checkIfOnline");
    }

    public static get(): CheckIfOnlineStep {
        return new CheckIfOnlineStep();
    }

    init(): void {
        // do nothing
    }    
    
    execute(state: State): string {
        return "yes";
    }
}