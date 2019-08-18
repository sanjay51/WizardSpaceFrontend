import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { APIService, AuthenticationService } from 'ix-angular-elements';
import { AppStateService } from 'src/app/app-state.service';
import { UpdateAppAPI } from '../flows/api/update-app.api';

@Component({
  selector: 'app-settings-form',
  templateUrl: './app-settings-form.component.html',
  styleUrls: ['./app-settings-form.component.scss']
})
export class AppSettingsFormComponent implements OnInit {

  constructor(private appState: AppStateService, private apiService: APIService, private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  setModalVisibility(isVisible: boolean) {
    this.appState.isSettingsModalVisible = isVisible;
  }

  form = {
    fields: [
      {
        name: "title",
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
        options: ["Art & Design", "Auto & Vehicles", "Beauty", "Books & Reference", "Business", "Comics", "Communications", "Dating", "Education", "Entertainment", "Events", "Finance", "Food & Drink", "Health & Fitness", "House & Home", "Libraries & Demo", "Lifestyle", "Maps & Navigation", "Medical", "Music & Audio", "News & Magazines", "Parenting", "Personalization", "Photography", "Productivity", "Shopping", "Social", "Sports", "Tools", "Travel & Local", "Video Players & Editors", "Weather"],
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

      let api = new UpdateAppAPI(this.appState.state.getAppId(), fields.title.value, 
      fields.description.value, fields.category.value, fields.logo.value,
      images, this.authentication.state.getAuthStateAttribute("userId"),
      this.authentication.state.getAuthStateAttribute("authId"));
      console.log(api);
      return this.apiService.call(api).toPromise();
    },

    postSubmit: (response) => {
      console.log(response);
    },

    parseError: (error): string => {
      return "Could not save. Please try again";
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
