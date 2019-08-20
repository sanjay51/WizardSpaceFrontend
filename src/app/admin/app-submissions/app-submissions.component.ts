import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'ix-angular-elements';

@Component({
  selector: 'app-submissions',
  templateUrl: './app-submissions.component.html',
  styleUrls: ['./app-submissions.component.scss']
})
export class AppSubmissionsComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

}
