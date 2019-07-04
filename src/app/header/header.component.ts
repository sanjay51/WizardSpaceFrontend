import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'ix-angular-elements';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

}
