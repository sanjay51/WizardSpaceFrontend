import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { IxAngularElementsModule, URL_TOKEN } from 'ix-angular-elements';
import { AceEditorModule } from 'ng2-ace-editor';
import { AppEditorComponent } from './app-editor/app-editor.component';
import { LiveEditorComponent } from './app-editor/live-editor/live-editor.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './root/app.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { FileMenuComponent } from './app-editor/file-menu/file-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AppEditorComponent,
    HomeComponent,
    HeaderComponent,
    LiveEditorComponent,
    LoginComponent,
    SignupComponent,
    FileMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    AceEditorModule,
    IxAngularElementsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: URL_TOKEN, 
      useValue: 'https://msa1yzr6r9.execute-api.us-east-1.amazonaws.com/prod' 
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule { }
