import { Component, OnInit } from '@angular/core';
import { ROUTE_HOME } from '../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSuccessRoute = ROUTE_HOME;
  loginCancelRoute = ROUTE_HOME;

  constructor(
  ) { }

  ngOnInit() {
  }

}
