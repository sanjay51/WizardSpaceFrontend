import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { APIService, AuthStateService } from 'ix-angular-elements';
import { ReportBugAPI } from './report-bug.api';

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.scss']
})
export class ReportBugComponent implements OnInit {
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

    title: "Bug report",

    submitButtonLabel: "Submit",

    onSubmit: (fields): Promise<any> => {

      let api = new ReportBugAPI(fields.title.value, fields.details.value, 
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
