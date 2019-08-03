import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/internal/operators";
import { InitFlowService } from '../flows/init-flow.service';

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

  public dataHolders = {
    "html": new DataHolder("devstudio-app-live-editor-data-html"),
    "css": new DataHolder("devstudio-app-live-editor-data-css"),
    "js": new DataHolder("devstudio-app-live-editor-data-js"),
    "readme": new DataHolder("devstudio-app-live-editor-data-readme")
  }

  constructor(private initFlow: InitFlowService, private elementRef:ElementRef, private renderer: Renderer2, private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.status = "loading"; 
    this.updateView();

    this.initFlow.start();

    for (let dataHolder of Object.values(this.dataHolders)) {
      dataHolder.dataSubscriber
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe(data => { dataHolder.updateData(data); this.updateView() });
    }
  }

  public getData(type: string) {
    return this.dataHolders[type].data;
  }

  public onDataChange(query: string, type: string) {
    this.dataHolders[type].dataSubscriber.next(query);
  }

  public updateView() {
    this.status = "updating..";
    this.save()

    if (!this.dataHolders['html'].data) {
      this.dataHolders['html'].data = this.getFirstTimeTutorialData();
    }
    
    this.sanitizedData = '<style> ' + this.dataHolders['css'].data + ' </style> ' +
    '<script> ' + this.dataHolders['js'].data + ' </script> ' +
      this.dataHolders['html'].data

    var iframe = document.getElementById('iframeview') as HTMLIFrameElement;
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(this.sanitizedData);
    iframe.contentWindow.document.close();
    
    this.cd.detectChanges();
  }

  save() {
    Object.values(this.dataHolders).forEach(dataHolder => dataHolder.save());
    this.status = "saved";
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

class DataHolder {
  public data: string;
  public localStorageKey: string;
  public dataSubscriber: Subject<string> = new Subject<string>();

  public constructor(localStorageKey: string) {
    this.localStorageKey = localStorageKey;
    this.data = JSON.parse(localStorage.getItem(localStorageKey));
  }

  public updateData(data: string) {
    this.data = data;
  }

  public save() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.data));
  }
}