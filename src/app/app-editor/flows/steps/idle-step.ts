import { State, Step } from 'ix-angular-elements';

export class IdleStep extends Step {

    private constructor() {
        super("idle");
    }

    public static get(): IdleStep {
        return new IdleStep();
    }
    
    init(): void {
        // do nothing
    }    
    
    execute(state: State): string {
        return "initialized";
    }
}