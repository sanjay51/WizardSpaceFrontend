import { Component, OnInit } from '@angular/core';
import { APIService, AuthStateService } from 'ix-angular-elements';
import { App } from '../app-editor/app';
import { GetAppsByGroupIdAPI } from '../get-apps-by-group.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  apps: App[] = [];
  status = 'loading';

  constructor(private state: AuthStateService, private apiService: APIService) {
  }

  ngOnInit() {
    this.getAllApps();
  }

  async getAllApps() {
    let userId = this.state.getAuthStateAttribute("userId");
    let authId = this.state.getAuthStateAttribute("authId");
    let api = new GetAppsByGroupIdAPI("LIVE_APPS", userId, authId);
    this.apiService.call(api).toPromise().then(response => {
      for (let appResponse of response) {
        let app = App.fromAppGroupResponse(appResponse.appData);
        console.log(app);
        this.apps.push(app);
      }
      this.status = 'ready';
      console.log(response)
    }).catch(error => { 
      console.log(error);
      this.status = 'error' });
  }

  public categories = [
    { name: "Art & Design", "icon": "filter_vintage", "path": "" },
    { name: "Beauty", "icon": "face", "path": ""},
    { name: "Books & Reference", "icon": "library_books", "path": ""},
    { name: "Business", "icon": "business", "path": ""},
    /* { name: "Comics", "icon": "", "path": ""}, */
    { name: "Communications", "icon": "chat", "path": ""},
    { name: "Dating", "icon": "favorite", "path": ""},
    { name: "Education", "icon": "school", "path": ""},
    { name: "Entertainment", "icon": "movie", "path": ""},
    { name: "Events", "icon": "event", "path": ""},
    { name: "Finance", "icon": "money", "path": ""},
    { name: "Food & Drink", "icon": "fastfood", "path": ""},
    { name: "Games", "icon": "sports_esports", "path": ""},
    { name: "Health & Fitness", "icon": "fitness_center", "path": ""},
    { name: "House & Home", "icon": "home", "path": ""},
    /* { name: "Libraries & Demo", "icon": "library_books", "path": ""}, */
    { name: "Lifestyle", "icon": "deck", "path": ""},
    { name: "Maps & Navigation", "icon": "map", "path": ""},
    { name: "Medical", "icon": "local_hospital", "path": ""},
    { name: "Music & Audio", "icon": "music_video", "path": ""},
    { name: "News & Magazines", "icon": "group_work", "path": ""},
    /* { name: "Parenting", "icon": "", "path": ""}, */
    /* { name: "Personalization", "icon": "", "path": ""}, */
    { name: "Photography", "icon": "insert_photo", "path": ""},
    { name: "Productivity Tools", "icon": "waves", "path": ""},
    { name: "Shopping", "icon": "add_shopping_cart", "path": ""},
    { name: "Social", "icon": "deck", "path": ""},
    { name: "Sports", "icon": "sports_football", "path": ""},
    /* { name: "Tools", "icon": "", "path": ""}, */
    { name: "Travel & Local", "icon": "location_city", "path": ""},
    /* { name: "Video Players & Editors", "icon": "", "path": ""}, */
    { name: "Weather", "icon": "wb_sunny", "path": ""}
  ]
}

/*

appId: "1930329f-5e1b-49e2-b25f-47180af36058"
appName: "my first app "
category: "Productivity"
creationEpoch: 1566685469677
description: "asdfasdfasd jjjxx"
devId: "bd52e962-c5ee-4494-b052-d091e7456194"
draftVersion: 1566684677337
images: (2) ["hey hey 2", "asdfasdfasdf"]
lastUpdatedEpoch: 1566685469677
logo: "my first app logo"
*/