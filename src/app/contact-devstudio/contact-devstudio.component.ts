import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { APIService, AuthStateService } from 'ix-angular-elements';
import { ContactDevstudioAPI } from './contact-devstudio.api';

@Component({
  selector: 'app-contact-devstudio',
  templateUrl: './contact-devstudio.component.html',
  styleUrls: ['./contact-devstudio.component.scss']
})
export class ContactDevstudioComponent implements OnInit {
  isSubmitted = false;

  constructor(private apiService: APIService, private state: AuthStateService) { }

  ngOnInit() {
  }

  form = {
    fields: [
      {
        name: "subject",
        label: "Subject*",
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

    title: "Contact DevStudio.app",

    submitButtonLabel: "Submit",

    onSubmit: (fields): Promise<any> => {

      let api = new ContactDevstudioAPI(fields.subject.value, fields.details.value,
        fields.email.value, this.state.getAuthStateAttribute("userId"), 
        this.state.getAuthStateAttribute("authId"));
      return this.apiService.call(api).toPromise();
    },

    postSubmit: (response) => {
      this.isSubmitted = true;
    },

    onCancel: () => {
      this.state.navigateTo("/");
    }
  }

  fileAnother() {
    location.reload();
  }

  goHome() {
    this.state.navigateTo("/");
  }
}
