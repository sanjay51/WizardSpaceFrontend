import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  features = FEATURES;
  issues = ISSUES;

  constructor() { }

  ngOnInit() {
  }

}

const IN_PROGRESS = "IN_PROGRESS";
const TODO = "TODO";
const COMPLETE = "COMPLETE";

const FEATURES = [
  {
    Serial: 1, 
    Category: 'Frontend', 
    Title: "A way to share a draft app (generate link with token)", 
    Description: "", 
    Status: TODO
  },
  {
    Serial: 2, 
    Category: 'Frontend', 
    Title: "Create a beautiful landing app (with bootstrap)", 
    Description: "", 
    Status: TODO
  },
  {
    Serial: 3, 
    Category: 'Frontend', 
    Title: "Setup logging with remote calls", 
    Description: "", 
    Status: TODO
  },
  {
    Serial: 4, 
    Category: 'Frontend', 
    Title: "Add image upload capability in app settings form", 
    Description: "", 
    Status: TODO
  },
  {
    Serial: 5, 
    Category: 'Static assets', 
    Title: "Use own storage for images instead of hotlinking with appscope", 
    Description: "", 
    Status: TODO
  },
];

const ISSUES = [
  {
    Serial: 1, 
    Category: 'Backend', 
    Title: "Fix: CORS access denied on backend exception (any API)", 
    Description: "An exception should also be casted in Response object with CORS headers.", 
    Status: TODO
  },
  {
    Serial: 2, 
    Category: 'Backend', 
    Title: "Fix: Use data from the time of app publish", 
    Description: "When approving publishing app, get data from wz-app-versions rather than wz-app (as the app may have changed in the meantime)", 
    Status: TODO
  },
  {
    Serial: 3, 
    Category: 'Backend', 
    Title: "Avoid duplicates when publishing apps - by default a duplicate entry will be created (if one already existed for a given app)", 
    Description: "Solution: When publishing an app, also update wz-apps table for that app, with the 'appRank'. Next time when we publish a new update, check the wz-apps table, and delete the old entry.", 
    Status: TODO
  }
];
