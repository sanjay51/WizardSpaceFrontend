import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'ix-angular-elements';

@Component({
  selector: 'file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.scss']
})
export class FileMenuComponent implements OnInit {

  constructor(private state: AuthStateService) { }

  ngOnInit() {
  }

  run() {
    this.state.navigateWithParams("/play/blah", {"debug": true})
  }
}
