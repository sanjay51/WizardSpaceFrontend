import { Component, OnInit } from '@angular/core';
import { APIService, AuthStateService, IxCard } from 'ix-angular-elements';
import { GetAppsByGroupIdAPI } from '../get-apps-by-group.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards: IxCard[] = [];
  /*
    new IxCard("image-gallery", "APP 1", "App 1 description", "link", "black", "white"),
    new IxCard("ruler-pencil", "APP 2", "App 2 description", "link", "gray", "white"),
    new IxCard("truck", "APP 3", "App 3 description", "link", "lightcyan", "black"),
    new IxCard("line-chart", "APP 4", "App 4 description", "link", "lightgreen", "black"),
    new IxCard("bullseye", "APP 5", "App 5 description", "link", "lightcoral", "black"),
  */

  constructor(private state: AuthStateService, private apiService: APIService) {
  }

  ngOnInit() {
    this.getAllApps();
  }

  getAllApps() {
    let userId = this.state.getAuthStateAttribute("userId");
    let authId = this.state.getAuthStateAttribute("authId");
    let api = new GetAppsByGroupIdAPI("LIVE_APPS", userId, authId);
    this.apiService.call(api).toPromise().then(response => {
      for (let card of response) {
        this.cards.push(new IxCard("image-gallery", card.appName, card.description, "link", "black", "white"))
      }
      console.log(response)
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