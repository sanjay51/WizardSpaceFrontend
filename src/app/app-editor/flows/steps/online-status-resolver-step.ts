import { State, Step } from 'ix-angular-elements';

export class OnlineStatusResolverStep extends Step {
    private static INSTANCE: OnlineStatusResolverStep;

    private constructor() {
        super("checkIfOnline");
    }

    public static get(): OnlineStatusResolverStep {
        if (!this.INSTANCE) this.INSTANCE = new OnlineStatusResolverStep();

        return this.INSTANCE;
    }

    init(): void {
        // do nothing
    }    
    
    async execute(state: State): Promise<string> {
        return "yes";
    }
}