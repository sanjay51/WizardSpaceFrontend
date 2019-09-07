import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'ix-angular-elements';
import { AppStateService } from '../../app-state.service';
import { FlowStateService } from '../flows/flow-state.service';
import { MatDialog } from '@angular/material';
import { SubmitAppDialog } from '../submit-app-dialog/submit-app-dialog.component';
import { AppSettingsDialogComponent } from '../app-settings-dialog/app-settings-dialog.component';

@Component({
  selector: 'file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.scss']
})
export class FileMenuComponent implements OnInit {

  constructor(private state: AuthStateService, 
    private flowState: FlowStateService,
    private appState: AppStateService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  run() {
    window.open("/play/" + this.flowState.getAppId() + "?debug=true", "_blank");
  }

  openPublishAppDialog(): void {
    console.log('opening dialog (publish app)');
    const dialogRef = this.dialog.open(SubmitAppDialog, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openAppSettingsDialog(): void {
    console.log('opening dialog (app settings)');
    const dialogRef = this.dialog.open(AppSettingsDialogComponent, {
      minWidth: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}
