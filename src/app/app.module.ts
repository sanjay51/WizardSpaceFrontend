import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { IxAngularElementsModule } from 'ix-angular-elements';
import { AppEditorComponent } from './app-editor/app-editor.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StateService } from './service/state.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AppEditorComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IxAngularElementsModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [StateService],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule { }
