import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService, AuthenticationService, FinishedStep, Flow } from 'ix-angular-elements';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/internal/operators";
import { LOADING_GIF_SRC } from '../../constants';
import { FlowStateService } from '../flows/flow-state.service';
import { InitFlowService } from '../flows/init-flow.service';
import { RefreshViewStep } from '../flows/steps/refresh-view-step';
import { SaveAppDataStep } from '../flows/steps/save-app-data-step';
import { SaveAppInfoStep } from '../flows/steps/save-app-info-step';
import { Quotes } from '../quotes';

@Component({
  selector: 'app-live-editor',
  templateUrl: './live-editor.component.html',
  styleUrls: ['./live-editor.component.scss']
})
export class LiveEditorComponent implements OnInit {
  public status = "initializing"
  LOADING_GIF_SRC: string = LOADING_GIF_SRC;

  public aceOptions = {
    wrap: true,
    showLineNumbers: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    indentedSoftWrap: false,
    useWorker: false, //Syntax checker
  };

  constructor(private initFlow: InitFlowService, private flowStateService: FlowStateService,
    private authentication: AuthenticationService, private api: APIService, 
    private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  /**
   * DataSubscribers debounce the keyboard input, and invoke the dataChangeHandler flow.
   */
  public dataSubscribers = {
    "html": new Subject<string>(),
    "css": new Subject<string>(),
    "js": new Subject<string>(),
    "readme": new Subject<string>(),
    "config": new Subject<string>()
  }

  private dataChangeHandlerFlow: Flow;

  ngOnInit() {
    // get appId from route
    let appId = this.route.snapshot.params.appId;
    this.flowStateService.flowState.set("appId", appId);
    
    this.dataChangeHandlerFlow = this.getDataChangeHanderFlow();

    for (let subscriber of Object.values(this.dataSubscribers)) {
      subscriber
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(data => {
          this.dataChangeHandlerFlow.invoke(); 
          this.cd.detectChanges();
        });
    }

    this.initFlow.start().finally(() => this.status="initialized");
  }

  onDataChange(query: string, type: string) {
    this.dataSubscribers[type].next(query);
  }

  getDataHolder(type: string) {
    return this.flowStateService.dataHolders[type];
  }

  getDataChangeHanderFlow(): Flow {
    let saveAppInfoStep = SaveAppInfoStep.get(this.flowStateService, this.authentication, this.api);
    let saveAppDataStep = SaveAppDataStep.get(this.flowStateService, this.authentication, this.api);

    // Refresh View
    let flow = new Flow(RefreshViewStep.get(this.flowStateService), this.flowStateService.getFlowState());

    // Save data
    flow.addTransition(RefreshViewStep.get(this.flowStateService), "refreshed", saveAppInfoStep)

    // Save app info
    flow.addTransition(saveAppInfoStep, "saved", saveAppDataStep)
    
    // Finish
    flow.addTransition(saveAppDataStep, "saved", FinishedStep.get());

    return flow;
  }

  private quote = null;
  public getQuote(): string {
    if (! this.quote) this.quote = Quotes.getQuote();
    return this.quote;
  }
}
