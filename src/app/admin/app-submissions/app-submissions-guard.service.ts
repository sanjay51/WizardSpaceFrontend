import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from 'ix-angular-elements';
import { ROUTE_HOME } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AppSubmissionsGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }
  canActivate(): boolean {
      if (this.auth.isLoggedIn() && this.auth.state.getAuthStateAttribute("accessLevel") == "TWELVE") {
        return true;
      }
      
      this.router.navigate([ROUTE_HOME]);
      return false;
  }
}