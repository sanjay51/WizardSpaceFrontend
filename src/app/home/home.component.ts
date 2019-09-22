import { Component, OnInit } from '@angular/core';
import { APIService, AuthStateService } from 'ix-angular-elements';
import { App, ACTIVE_APP_CATEGORIES } from '../app-editor/app';
import { GetAppsByGroupIdAPI } from '../get-apps-by-group.api';
import { ActivatedRoute } from '@angular/router';
import { GetAppsByGroupAndCategoryAPI } from './get-apps-by-group-and-category.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories = ACTIVE_APP_CATEGORIES;
  pages = [];
  paginationHandle: string = "";
  status = 'loading';
  category: string;

  constructor(private state: AuthStateService, private route: ActivatedRoute, private apiService: APIService) {
  }

  ngOnInit() {
    this.getAllApps();
  }

  async getAllApps() {

    this.route.params.subscribe(
        params => {
            this.category = params.category;
            console.log(this.category);

            if (this.category) {
              this.loadCategorySpecificApps(this.category);
            } else {
              this.loadAllApps();
            }
        }
    );
  }

  loadAllApps() {
    let userId = this.state.getAuthStateAttribute("userId");
    let authId = this.state.getAuthStateAttribute("authId");
    this.status = 'loading';
    
    let api = new GetAppsByGroupIdAPI("LIVE_APPS", userId, authId, 60)
                .withPaginationHandle(this.paginationHandle);
    this.apiService.call(api).toPromise().then(response => {
      console.log(response);
      let apps = [];
      for (let appResponse of response.apps) {
        let app = App.fromAppGroupResponse(appResponse.appData);
        apps.push(app);
      }

      this.pages.push(apps)

      this.paginationHandle = response.paginationHandle;
      
      this.status = 'ready';
    }).catch(error => {
      console.log(error);
      this.status = 'error'
    });
  }

  loadMore() {
    this.loadAllApps();
  }

  loadCategorySpecificApps(category: string) {
    let userId = this.state.getAuthStateAttribute("userId");
    let authId = this.state.getAuthStateAttribute("authId");
    this.status = 'loading';
    this.pages = [];

    let apps = []
    
    let api = new GetAppsByGroupAndCategoryAPI("LIVE_APPS", category, userId, authId);
    this.apiService.call(api).toPromise().then(response => {
      for (let appResponse of response) {
        let app = App.fromAppGroupResponse(appResponse.appData);
        apps.push(app);
      }
      this.status = 'ready';
      this.pages.push(apps);
    }).catch(error => {
      console.log(error);
      this.status = 'error'
    });
  }
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