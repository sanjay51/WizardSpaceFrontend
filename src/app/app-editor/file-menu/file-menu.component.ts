import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'ix-angular-elements';
import { FlowStateService } from '../flows/flow-state.service';

@Component({
  selector: 'file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.scss']
})
export class FileMenuComponent implements OnInit {

  constructor(private state: AuthStateService, private flowState: FlowStateService) { }

  ngOnInit() {
  }

  run() {
    window.open("/play/" + this.flowState.getAppId() + "?debug=true", "_blank");
    //this.state.navigateWithParams("/play/" + this.flowState.getAppId(), {"debug": true})
  }
}
