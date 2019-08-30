import { Component } from '@angular/core';
import { AuthenticationService } from 'ix-angular-elements';
import { Router } from '@angular/router';
import { ROUTE_PLAY } from '../constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wizard-space';

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
