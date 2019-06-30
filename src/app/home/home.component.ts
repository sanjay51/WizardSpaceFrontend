import { Component, OnInit } from '@angular/core';
import { IxCard } from 'ix-angular-elements';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards: IxCard[] = [
    new IxCard("image-gallery", "APP 1", "App 1 description", "link", "black", "white"),
    new IxCard("ruler-pencil", "APP 2", "App 2 description", "link", "gray", "white"),
    new IxCard("truck", "APP 3", "App 3 description", "link", "lightcyan", "black"),
    new IxCard("line-chart", "APP 4", "App 4 description", "link", "lightgreen", "black"),
    new IxCard("bullseye", "APP 5", "App 5 description", "link", "lightcoral", "black"),
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
