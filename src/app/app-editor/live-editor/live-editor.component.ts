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
  public data;
  public prevData;
  public sanitizedData;
  public status = "saving"

  public aceOptions = {
    wrap: true,
    showLineNumbers: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    indentedSoftWrap: false,
    useWorker: false //Syntax checker
  };

  dataChanged: Subject<string> = new Subject<string>();

  constructor(private sanitizer: DomSanitizer, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("wizardspace-live-editor-data"));
    this.status = "loading"; 
    this.updateView();

    this.dataChanged
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(data => { this.data = data; this.updateView(); });
  }

  public onDataChange(query: string) {
    this.dataChanged.next(query);
  }

  public updateView() {
    this.status = "updating..";
    let parsed = this.data;
    if (this.data != this.getFirstTimeTutorialData())
      localStorage.setItem("wizardspace-live-editor-data", JSON.stringify(parsed));
    this.status = "saved";

    if (!this.data) this.data = this.getFirstTimeTutorialData();
    this.sanitizedData = this.sanitizer.bypassSecurityTrustHtml(this.data);
    this.cd.detectChanges();
  }
  
  getTitle(): string {
    return "Live Editor"
  }

  getFirstTimeTutorialData() {
    return "<h1>Learn how to use ixTutor live editor</h1> \n\
This is a quick tutorial. Type in the editor (left) to see your changes rendered live (on the right). \n\
<h3>1. You can use any HTML tags, including h1, h2, a, div etc.</h3> Example: \n\
<table border='1'> \n\
    <tr><td><h1>H1</h1></td></tr>  \n\
    <tr><td>h2</td><td><h2>H2</h2></td></tr>  \n\
    <tr><td>a</td><td><a href='google.com' target='_blank'>a link to google.com</a></td><td>some more cool stuff</td></td></tr> </table>  \n\
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
<br/>\n\
<h3>5. Custom ixTutor elements</h3>\n\
These elements can be used when submitting a tutorial for ixTutor.com. You can send your submissions to <i>ixtutor.machine.learning@gmail.com</i> .<br/><br/> \
<h5>5.1 <i>ix-note</i> element</h5>\n\
<ix-note title=\"Note\" text=\"This is awesome!!!\"></ix-note>\n\
<br/>\n\
<h5>5.2 <i>post-heading</i> element</h5>\n\
<post-heading text=\"We're learning about how to create custom ixtutor elements!\"></post-heading><br/>\n\
\n\
<h5>5.3 <i>question-answer</i> element</h5>\n\
<question-answer question=\"Which of these is correct?\" options=\"asdf\" answer=1 answer-explanation=\"a is correct!\"]\"></question-answer>\n\
Note: We'll soon expand the options format. <br/>\n\
<br/>\n\
<h5>5.4 <i>code-run</i> element</h5>\n\
<code-run pre-code=\"\" code=\"import tensorflow as tf\n\
\n\
# Declare variables\n\
x = tf.Variable(3, name='x')\n\
y = tf.Variable(4, name='y')\n\
      \n\
# Function to compute\n\
f = (x * x * y) + y + 2\n\
\n\
with tf.Session() as sess:\n\
    x.initializer.run()\n\
    y.initializer.run()\n\
    result = f.eval()\n\
      \n\
print(result)\"\n\
      post-code=\"\" output=\"42\"></code-run>\n\
\n\
<br/>\n\
    "
  }
}