import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthenticationService, AuthStateService } from 'ix-angular-elements';
import { ROUTE_HOME, ROUTE_LOGIN } from '../../constants';
import { SignupState } from './signupState';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authentication: AuthenticationService,
    private state: AuthStateService) { }

  ngOnInit() {
  }

  form = {
    fields: [
      {
        name: "name",
        label: "Name",
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
      let signupState: SignupState = new SignupState(
        fields.name.value,
        fields.email.value,
        fields.password.value,
      );
      
      return this.authentication.login(null, null); // TODO: change to signup
    },

    postSubmit: (response) => {
      this.state.navigate(ROUTE_LOGIN, null);
    },

    onCancel: () => {
      this.state.navigateTo(ROUTE_HOME);
    }
  }

}
