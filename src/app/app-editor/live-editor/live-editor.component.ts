import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinishedStep, Flow } from 'ix-angular-elements';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/internal/operators";
import { FlowStateService } from '../flows/flow-state.service';
import { InitFlowService } from '../flows/init-flow.service';
import { RefreshViewStep } from '../flows/steps/refresh-view-step';
import { SaveLocalAppDataStep } from '../flows/steps/save-local-app-data-step';

@Component({
  selector: 'app-live-editor',
  templateUrl: './live-editor.component.html',
  styleUrls: ['./live-editor.component.scss']
})
export class LiveEditorComponent implements OnInit {
  public status = "saving"

  public aceOptions = {
    wrap: true,
    showLineNumbers: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    indentedSoftWrap: false,
    useWorker: false, //Syntax checker
  };

  constructor(private initFlow: InitFlowService, private flowStateService: FlowStateService, 
    private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  /**
   * DataSubscribers debounce the keyboard input, and invoke the dataChangeHandler flow.
   */
  public dataSubscribers = {
    "html": new Subject<string>(),
    "css": new Subject<string>(),
    "js": new Subject<string>(),
    "readme": new Subject<string>()
  }

  private dataChangeHandlerFlow: Flow;

  ngOnInit() {
    this.status = "loading";

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

    this.initFlow.start();
  }

  onDataChange(query: string, type: string) {
    this.dataSubscribers[type].next(query);
  }

  getDataHolder(type: string) {
    return this.flowStateService.dataHolders[type];
  }

  getDataChangeHanderFlow(): Flow {
    // Refresh View
    let flow = new Flow(RefreshViewStep.get(this.flowStateService), this.flowStateService.getFlowState());

    // Save data in local
    flow.addTransition(RefreshViewStep.get(this.flowStateService), "refreshed", SaveLocalAppDataStep.get(this.flowStateService))
    
    // Finish
    flow.addTransition(SaveLocalAppDataStep.get(this.flowStateService), "saved", FinishedStep.get());

    return flow;
  }
}
