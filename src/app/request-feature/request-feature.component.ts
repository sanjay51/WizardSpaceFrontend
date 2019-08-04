import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { APIService, AuthStateService } from 'ix-angular-elements';
import { RequestFeatureAPI } from './request-feature.api';

@Component({
  selector: 'app-request-feature',
  templateUrl: './request-feature.component.html',
  styleUrls: ['./request-feature.component.scss']
})
export class RequestFeatureComponent implements OnInit {
  isSubmitted = false;

  constructor(private apiService: APIService, private state: AuthStateService) { }

  ngOnInit() {
  }

  form = {
    fields: [
      {
        name: "title",
        label: "Title*",
        validators: [Validators.required, Validators.minLength(6)],
        defaultValue: '',
      },
      {
        name: "details",
        label: "Details",
        validators: [],
        defaultValue: '',
      },
      {
        name: "email",
        label: "Your email*",
        validators: [Validators.required, Validators.email],
        defaultValue: '',
      }
    ],

    title: "Request a feature",

    submitButtonLabel: "Submit",

    onSubmit: (fields): Promise<any> => {

      let api = new RequestFeatureAPI(fields.title.value, fields.details.value, 
        fields.email.value, this.state.getAuthStateAttribute("userId"));
      return this.apiService.call(api).toPromise();
    },

    postSubmit: (response) => {
      this.isSubmitted = true;
    },

    onCancel: () => {
      this.state.navigateTo("/");
    }
  }

  requestAnother() {
    location.reload();
  }

  goHome() {
    this.state.navigateTo("/");
  }

}
