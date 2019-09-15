import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { AppCarousalBanner } from '../app-carousal-banner/app-carousal-banner.component';

@Component({
  selector: 'app-carousal',
  templateUrl: './app-carousal.component.html',
  styleUrls: ['./app-carousal.component.scss']
})
export class AppCarousalComponent implements OnInit {

  public banners: AppCarousalBanner[] = [
    {
      imageUrl: "https://wizardspace-images.s3.amazonaws.com/banner/2018.png",
      title: "2018",
      backgroundColor: "#f57c5f",
      appId: "f9c07420-8992-445b-a384-71a51e3f9004"
    },
    {
      imageUrl: "https://wizardspace-images.s3.amazonaws.com/banner/google_santa_tracker.png",
      title: "Google Santa Tracker",
      backgroundColor: "#4edcf4",
      appId: "f9c07420-8992-445b-a384-71a51e3f9004"
    },
    {
      imageUrl: "https://wizardspace-images.s3.amazonaws.com/banner/headline.png",
      title: "Headline",
      backgroundColor: "white",
      appId: "f9c07420-8992-445b-a384-71a51e3f9004"
    },
    {
      imageUrl: "https://wizardspace-images.s3.amazonaws.com/banner/telegram.png",
      title: "Telegram",
      backgroundColor: "#517fa3",
      appId: "f9c07420-8992-445b-a384-71a51e3f9004"
    },
    {
      imageUrl: "https://wizardspace-images.s3.amazonaws.com/banner/twitter.jpg",
      title: "Twitter",
      backgroundColor: "white",
      appId: "f9c07420-8992-445b-a384-71a51e3f9004"
    },
    {
      imageUrl: "https://wizardspace-images.s3.amazonaws.com/banner/tower_game.png",
      title: "The Tower Game",
      backgroundColor: "#66dada",
      appId: "f9c07420-8992-445b-a384-71a51e3f9004"
    },
  ]

  imgags = [
    '/assets/laptop.jpg',
    '/assets/laptop.jpg',
    '/assets/laptop.jpg',
    '/assets/laptop.jpg'
  ];
  public carouselTileItems: Array<any> = [0, 1, 2, 3, 4, 5];
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  };
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 3, all: 0 },
    slide: 4,
    speed: 250,
    point: {
      visible: false
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };
  constructor() {}

  ngOnInit() {
    this.carouselTileItems.forEach(el => {
      this.carouselTileLoad(el);
    });
  }

  public carouselTileLoad(j) {
    const len = this.carouselTiles[j].length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTiles[j].push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

}
