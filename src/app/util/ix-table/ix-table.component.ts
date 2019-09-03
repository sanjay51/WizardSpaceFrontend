import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ix-table',
  templateUrl: './ix-table.component.html',
  styleUrls: ['./ix-table.component.scss']
})
export class IxTableComponent implements OnInit {
  @Input() data: any[];
  displayedColumns: string[] = [];

  constructor() { }

  ngOnInit() {
    let first = this.data[0];
    if (!first) return;

    for (let key of Object.keys(first)) this.displayedColumns.push(key);
  }
}

