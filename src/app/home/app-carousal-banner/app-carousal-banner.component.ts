import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthStateService } from 'ix-angular-elements';

export class AppCarousalBanner {
  imageUrl: string;
  title: string;
  backgroundColor: string;
  appId: string;
}

@Component({
  selector: 'app-carousal-banner',
  templateUrl: './app-carousal-banner.component.html',
  styleUrls: ['./app-carousal-banner.component.scss']
})
export class AppCarousalBannerComponent implements OnInit {
  @Input() banner: AppCarousalBanner;

  constructor(private state: AuthStateService) { }

  ngOnInit() {
  }

  gotoApp(appId: string) {
    this.state.navigateTo('/app/' + appId);
  }

}
