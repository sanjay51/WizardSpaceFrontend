import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { IxAngularElementsModule } from 'ix-angular-elements';
import { AceEditorModule } from 'ng2-ace-editor';
import { AppEditorComponent } from './app-editor/app-editor.component';
import { LiveEditorComponent } from './app-editor/live-editor/live-editor.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './root/app.component';

@NgModule({
  declarations: [
    AppComponent,
    AppEditorComponent,
    HomeComponent,
    HeaderComponent,
    LiveEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    AceEditorModule,
    IxAngularElementsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule { }
