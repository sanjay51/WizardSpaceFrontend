import { Component, OnInit } from '@angular/core';
import { APIService, AuthStateService } from 'ix-angular-elements';
import { Validators } from '@angular/forms';
import { SubmitExternalAppAPI } from './submit-external-app.api';
import { APP_CATEGORIES, App } from '../app-editor/app';
import { ROUTE_HOME } from '../constants';
import { CreateAppAPI } from '../app-editor/flows/api/create-app.api';
import { UpdateAppAPI } from '../app-editor/flows/api/update-app.api';

@Component({
  selector: 'app-submit-external-app',
  templateUrl: './submit-external-app.component.html',
  styleUrls: ['./submit-external-app.component.scss']
})
export class SubmitExternalAppComponent implements OnInit {
  isSubmitted = false;

  constructor(private apiService: APIService, private state: AuthStateService) { }

  ngOnInit() {
  }

  form = {
    fields: [
      {
        name: "name",
        label: "App Name / Title *",
        validators: [Validators.required, Validators.minLength(6)],
        defaultValue: '',
      },
      {
        name: "description",
        type: "textarea",
        label: "Description *",
        validators: [Validators.required],
        defaultValue: ''
      },
      {
        name: "category",
        type: "select",
        label: "Category *",
        options: APP_CATEGORIES,
        validators: [Validators.required],
        defaultValue: 'Productivity'
      },
      {
        name: "logo",
        label: "Logo URL *",
        validators: [Validators.required],
        defaultValue: ''
      },
      {
        name: "screenshot1",
        label: "Screenshot-1 URL *",
        validators: [Validators.required],
        defaultValue: ''
      },
      {
        name: "screenshot2",
        label: "Screenshot-2 URL",
        validators: [],
        defaultValue: ''
      },
      {
        name: "screenshot3",
        label: "Screenshot-3 URL",
        validators: [],
        defaultValue: ''
      },
      {
        name: "video",
        label: "Video URL (optional)",
        validators: [],
        defaultValue: ''
      }
    ],

    title: "Submit an app",

    submitButtonLabel: "Submit",

    onSubmit: (fields): Promise<any> => {
      let userId = this.state.getAuthStateAttribute("userId");
      let authId = this.state.getAuthStateAttribute("authId");

      let images: string[] = [fields.screenshot1.value];
      if (fields.screenshot2) images.push(fields.screenshot2.value)
      if (fields.screenshot3) images.push(fields.screenshot3.value)

      let app = new App();
      app.appName = fields.name.value;
      app.category = fields.category.value;
      app.description = fields.description.value;
      app.devId = userId;
      app.draftVersion = 0;
      app.images = images;
      app.logo = fields.logo.value;
      app.video = fields.video.value;
      app.isExternal = "true";

      let createAppAPI = new CreateAppAPI(userId, authId, app.appName);
      createAppAPI.setExternal();

      return this.apiService.call(createAppAPI).toPromise().then(
        response => {
          console.log(response);
          app.appId = response.appId;

          let updateAppAPI = new UpdateAppAPI(app.appId, app.appName, app.description,
            app.category, app.logo, app.images, userId, authId)

          this.apiService.call(updateAppAPI).toPromise().then(
            response => {
              console.log(response);

              let api = new SubmitExternalAppAPI(app, userId, authId);
              return this.apiService.call(api).toPromise().then(
                response => console.log(response)
              );
            }
          )
        }
      )
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
    this.state.navigateTo(ROUTE_HOME);
  }
}

