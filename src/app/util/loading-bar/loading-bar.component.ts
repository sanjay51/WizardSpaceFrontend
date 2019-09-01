import { Component, OnInit } from '@angular/core';
import { LOADING_GIF_SRC } from '../../constants';
import { Quotes } from '../quotes';

@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  public LOADING_GIF_SRC = LOADING_GIF_SRC;

  constructor() { }

  ngOnInit() {
  }

  private quote = null;
  public getQuote(): string {
    if (! this.quote) this.quote = Quotes.getQuote();
    return this.quote;
  }

}
