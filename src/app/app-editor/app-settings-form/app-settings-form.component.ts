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
        name: "screenshot-1",
        label: "Screenshot-1 URL*",
        validators: [Validators.required],
        defaultValue: ''
      },
      {
        name: "screenshot-2",
        label: "Screenshot-2 URL",
        validators: [],
        defaultValue: ''
      },
      {
        name: "screenshot-3",
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
