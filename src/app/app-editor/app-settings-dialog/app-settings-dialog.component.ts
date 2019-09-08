import { Component, OnInit, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { APIService, AuthenticationService } from 'ix-angular-elements';
import { AppStateService } from '../../app-state.service';
import { LOADING_GIF_SRC } from '../../constants';
import { App, APP_CATEGORIES } from '../app';
import { GetAppByIdAPI } from '../flows/api/get-app-by-id.api';
import { UpdateAppAPI } from '../flows/api/update-app.api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './app-settings-dialog.component.html',
  styleUrls: ['./app-settings-dialog.component.scss']
})
export class AppSettingsDialogComponent implements OnInit {
  status = 'initial';
  LOADING_GIF_SRC: string = LOADING_GIF_SRC;
  app: App = new App();
  saveScreenMessage = "";

  constructor(public appState: AppStateService, 
    private apiService: APIService, 
    private authentication: AuthenticationService,
    public dialogRef: MatDialogRef<AppSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  loadAppData() {
    this.status = 'loading';
    let userId = this.authentication.state.getAuthStateAttribute("userId");
    let authId = this.authentication.state.getAuthStateAttribute("authId");
    let api = new GetAppByIdAPI(this.appState.state.getAppId(), userId, authId);
    this.apiService.call(api).toPromise().then(response => {
      this.updateFormData(response);
      this.status = 'show-form'
    }).catch(error => {
      console.log(error);
      this.status = 'error'
    });
  }

  updateFormData(app: App) {
    this.app = app;
    if (this.app.appName) this.form.fields.find(field => field.name == "title").defaultValue = this.app.appName;
    if (this.app.description) this.form.fields.find(field => field.name == "description").defaultValue = this.app.description;
    if (this.app.category) this.form.fields.find(field => field.name == "category").defaultValue = this.app.category;
    if (this.app.logo) this.form.fields.find(field => field.name == "logo").defaultValue = this.app.logo;
    if (this.app.images[0]) this.form.fields.find(field => field.name == "screenshot1").defaultValue = this.app.images[0];
    if (this.app.images[1]) this.form.fields.find(field => field.name == "screenshot2").defaultValue = this.app.images[1];
    if (this.app.images[2]) this.form.fields.find(field => field.name == "screenshot3").defaultValue = this.app.images[2];
    if (this.app.video) this.form.fields.find(field => field.name == "video").defaultValue = this.app.video;
  }

  close() {
    this.status = 'initial';
    this.dialogRef.close();
  }

  form = {
    fields: [
      {
        name: "name",
        label: "App Name/Title*",
        validators: [Validators.required, Validators.minLength(6)],
        defaultValue: '',
      },
      {
        name: "description",
        type: "textarea",
        label: "Description*",
        validators: [Validators.required],
        defaultValue: ''
      },
      {
        name: "category",
        type: "select",
        label: "Category*",
        options: APP_CATEGORIES,
        validators: [Validators.required],
        defaultValue: 'Productivity'
      },
      {
        name: "logo",
        label: "Logo URL*",
        validators: [Validators.required],
        defaultValue: ''
      },
      {
        name: "screenshot1",
        label: "Screenshot-1 URL*",
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
        name: "screenshot4",
        label: "Screenshot-4 URL",
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

    title: "App Settings",

    submitButtonLabel: "Save",

    onSubmit: (fields): Promise<any> => {
      let images: string[] = [fields.screenshot1.value];
      if (fields.screenshot2) images.push(fields.screenshot2.value)
      if (fields.screenshot3) images.push(fields.screenshot3.value)
      if (fields.screenshot4) images.push(fields.screenshot4.value)

      let app = new App();
      app.appId = this.appState.state.getAppId();

      app.appName = fields.name.value;
      app.category = fields.category.value;
      app.description = fields.description.value;
      app.images = images;
      app.logo = fields.logo.value;
      app.video = fields.video.value;
      app.isExternal = "false";

      app.isHTTPSEnabled = true;
      app.isOfflineSupported = true;
      app.isAndroidInstallable = true;
      app.isIOSInstallable = true;
      app.lighthouseScore = 100;

      let api = new UpdateAppAPI(this.appState.state.getAppId(), app, 
      this.authentication.state.getAuthStateAttribute("userId"),
      this.authentication.state.getAuthStateAttribute("authId"));
      console.log(api);
      return this.apiService.call(api).toPromise();
    },

    postSubmit: (response) => {
      console.log(response);
      this.status = 'success';

      if (response.isNameTaken == true) {
        if (response.appName)
          this.saveScreenMessage = "However, the name you chose for the app is already taken, hence it's reverted to '" + response.appName + "'. Please go back and choose another name if you wish to change it."
        else 
          this.saveScreenMessage = "However, the name you chose for the app is already taken. Please go back and choose another name."
      } else {
        this.saveScreenMessage = "";
      }

      this.updateFormData(response);
    },

    parseError: (error): string => {
      console.log(error);
      return "Could not save. Please try again.";
    },

    onCancel: () => {
      this.close();
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
