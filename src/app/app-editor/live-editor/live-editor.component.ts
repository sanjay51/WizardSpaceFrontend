import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/internal/operators";

@Component({
  selector: 'app-live-editor',
  templateUrl: './live-editor.component.html',
  styleUrls: ['./live-editor.component.scss']
})
export class LiveEditorComponent implements OnInit {
  public htmlData;
  public cssData;
  public jsData;
  public readmeData;

  public prevData;
  public sanitizedData;
  public status = "saving"

  public aceOptions = {
    wrap: true,
    showLineNumbers: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    indentedSoftWrap: false,
    useWorker: false, //Syntax checker
  };

  dataChanged: Subject<string> = new Subject<string>();

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.htmlData = JSON.parse(localStorage.getItem("devstudio-app-live-editor-data"));
    this.cssData = "";
    this.jsData = "";
    
    this.status = "loading"; 
    this.updateView();

    this.dataChanged
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(htmlData => { this.htmlData = htmlData; this.updateView(); });
  }

  public onDataChange(query: string) {
    this.dataChanged.next(query);
  }

  public updateView() {
    this.status = "updating..";
    let parsed = this.htmlData;
    if (this.htmlData != this.getFirstTimeTutorialData())
      localStorage.setItem("devstudio-app-live-editor-data", JSON.stringify(parsed));
    this.status = "saved";

    if (!this.htmlData) this.htmlData = this.getFirstTimeTutorialData();
    this.sanitizedData = this.sanitizer.bypassSecurityTrustHtml(this.htmlData);
    this.cd.detectChanges();
  }
  
  getTitle(): string {
    return "Live Editor"
  }

  getFirstTimeTutorialData() {
    return "<h1>Learn how to use live app editor</h1> \n\
This is a quick tutorial. Type in the editor (left) to see your changes rendered live (on the right). \n\
<h3>1. You can use any HTML tags, including h1, h2, a, div etc.</h3> Example: \n\
 \n\
<h1>h1</h1> <h2>h2</h2> <h3>h3</h3> <h4>h4</h4> <h5>h5</h5> <h6>h6</h6> \n\
<a href='google.com' target='_blank'>a link to google.com</a>  \n\
<br/> \n\
<h3>2. Auto-save</h3> \n\
All changes are automatically saved in your browser, so even if you refresh this page, your changes will not be lost.<br/> \n\
<br/> \n\
<h3>3. You can even create and use CSS style templates</h3> \n\
<style>\n\
    .my-div {\n\
        color: white;\n\
        background-color: gray;\n\
        display: inline-block;\n\
        padding: 5px;\n\
        box-shadow: 0px 0px 5px gray;\n\
    }\n\
</style> \n\
<div class='my-div'>Hey this is my div from ixTutor.com</div>\n\
<br/><br/>\n\
<h3>4. Even with your own javascript</h3>\n\
<button onclick=\"alert(\'Hello from ixTutor.com\')\">Say Hello!</button> \n\
<br/>\n\
Note: Errors, if any, are logged in your browser console.<br/>\n\
<br/>";
  }
}