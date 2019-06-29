import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public entityMetadataMap = {};

  constructor(private router: Router) { }

  public navigate(to: string, id: string) {
    let link = ['/' + to]

    if (id) {
      link = ['/' + to, id]
    }
    
    this.router.navigate(link)
  }

  public navigateTo(to: string) {
    this.navigate(to, null);
  }

  public navidateWithParams(to: string, queryParams: any) {
    this.router.navigate(['/' + to], {queryParams: queryParams});
  }
}
