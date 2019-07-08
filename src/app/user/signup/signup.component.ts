import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { APIService, AuthenticationService, AuthStateService } from 'ix-angular-elements';
import { ROUTE_HOME, ROUTE_LOGIN } from '../../constants';
import { SignupAPI } from './signup.api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authentication: AuthenticationService,
    private state: AuthStateService, private apiService: APIService) { }

  ngOnInit() {
  }

  form = {
    fields: [
      {
        name: "fname",
        label: "First name",
        validators: [Validators.required, Validators.minLength(6)],
        defaultValue: '',
      },
      {
        name: "lname",
        label: "Last name",
        validators: [Validators.required, Validators.minLength(6)],
        defaultValue: '',
      },
      {
        name: "email",
        label: "Email",
        validators: [Validators.required, Validators.email],
        defaultValue: '',
      },
      {
        name: "password",
        label: "Password",
        validators: [Validators.required, Validators.minLength(6)],
        defaultValue: '',
        isPassword: true
      }
    ],

    title: "Sign up",

    submitButtonLabel: "Sign up",

    onSubmit: (fields): Promise<any> => {

      let api: SignupAPI = new SignupAPI(fields.fname.value, fields.lname.value, 
        fields.email.value, fields.password.value);
      return this.apiService.call(api).toPromise();
    },

    postSubmit: (response) => {
      this.state.navigate(ROUTE_LOGIN, null);
    },

    onCancel: () => {
      this.state.navigateTo(ROUTE_HOME);
    }
  }
}
