import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'ix-angular-elements';
import { ROUTE_PLAY } from '../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authentication: AuthenticationService, private route: Router) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

  logout() {
    this.authentication.logout();
  }

  isPlayerPage(): boolean {
    return (this.route.url.startsWith("/" + ROUTE_PLAY + "/"));
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.authentication.state.getAuthStateAttribute("accessLevel") == "TWELVE";
  }
}
