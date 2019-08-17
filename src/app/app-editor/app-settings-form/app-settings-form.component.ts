import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppStateService } from 'src/app/app-state.service';

@Component({
  selector: 'app-settings-form',
  templateUrl: './app-settings-form.component.html',
  styleUrls: ['./app-settings-form.component.scss']
})
export class AppSettingsFormComponent implements OnInit {

  constructor(private appState: AppStateService) { }

  ngOnInit() {
  }

  setModalVisibility(isVisible: boolean) {
    this.appState.isSettingsModalVisible = isVisible;
  }

  form = {
    fields: [
      {
        name: "title",
        label: "App Title",
        validators: [Validators.required, Validators.minLength(6)],
        defaultValue: '',
      },
      {
        name: "description",
        label: "Description",
        validators: [Validators.required],
        defaultValue: ''
      },
      {
        name: "category",
        label: "Category",
        validators: [Validators.required],
        defaultValue: ''
      },
      {
        name: "icon",
        label: "Icon",
        validators: [],
        defaultValue: ''
      },
      {
        name: "screenshots",
        label: "Screenshots",
        validators: [],
        defaultValue: ''
      }
    ],

    title: "App Settings",

    submitButtonLabel: "Save",

    onSubmit: (fields): Promise<any> => {
      return null; //this.authentication.login(fields.email.value, fields.password.value)
    },

    postSubmit: (response) => {
      //this.initializer.initializeAfterLogin(response, response.authId);
      //this.state.navigateTo(this.successPath);
    },

    parseError: (error): string => {
      return "Invalid username or password.";
    },

    onCancel: () => {
      this.setModalVisibility(false)
    },

    heading: {
      style: {
        'display': 'none'
      }
    },

    container: {
      style: {
        'width': '100%',
        'background-color': 'white',
        'border-radius': '0px',
        'box-shadow': '0px 0px 0px 0px black'
      }
    }
  }

}
