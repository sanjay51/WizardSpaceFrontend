import { Component, Input, OnInit } from '@angular/core';
import { App } from 'src/app/app-editor/app';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {
  @Input() app: App;

  constructor() { }

  ngOnInit() {
  }

}
