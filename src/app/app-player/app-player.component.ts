import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowStateService } from '../app-editor/flows/flow-state.service';

@Component({
  selector: 'app-app-player',
  templateUrl: './app-player.component.html',
  styleUrls: ['./app-player.component.scss']
})
export class AppPlayerComponent implements OnInit {

  constructor(private flowState: FlowStateService, private route: ActivatedRoute) { }

  ngOnInit() {
    let appId = this.route.snapshot.params.appId;
    let appData = this.flowState.getAppDataFromLocal(appId);
    
    let sanitizedData = '<style> ' + appData.css + ' </style> ' +
      '<script> ' + appData.js + ' </script> ' + appData.html;

    var iframe = document.getElementById('iframeview') as HTMLIFrameElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(sanitizedData);
    iframe.contentWindow.document.close();
  }
}
