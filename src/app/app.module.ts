import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IxAngularElementsModule, URL_TOKEN } from 'ix-angular-elements';
import { AceEditorModule } from 'ng2-ace-editor';
import { AdminComponent } from './admin/admin.component';
import { AppSubmissionsComponent } from './admin/app-submissions/app-submissions.component';
import { AppEditorComponent } from './app-editor/app-editor.component';
import { FileMenuComponent } from './app-editor/file-menu/file-menu.component';
import { LiveEditorComponent } from './app-editor/live-editor/live-editor.component';
import { AppPlayerComponent } from './app-player/app-player.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactDevstudioComponent } from './contact-devstudio/contact-devstudio.component';
import { FooterComponent } from './footer/footer.component';
import { AppCardComponent } from './home/app-card/app-card.component';
import { HomeComponent } from './home/home.component';
import { ReportBugComponent } from './report-bug/report-bug.component';
import { RequestFeatureComponent } from './request-feature/request-feature.component';
import { AppComponent } from './root/app.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule, MatListModule, MatProgressSpinnerModule, MatDialogModule, MatSidenavModule, MatButtonModule, MatIconModule, MatTableModule, MatCardModule, MatTabsModule, MatGridListModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDividerModule } from '@angular/material/divider';
import { PublishAppDialog } from './app-editor/publish-app-dialog/publish-app-dialog.component';
import { AppSettingsDialogComponent } from './app-editor/app-settings-dialog/app-settings-dialog.component';
import { AppDetailsPageComponent } from './app-details-page/app-details-page.component';
import { LoadingBarComponent } from './util/loading-bar/loading-bar.component';
import { BidiModule } from '@angular/cdk/bidi';
import { SubmitExternalAppComponent } from './submit-external-app/submit-external-app.component';
import { TodoComponent } from './admin/todo/todo.component';
import { IxTableComponent } from './util/ix-table/ix-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AppEditorComponent,
    HomeComponent,
    LiveEditorComponent,
    LoginComponent,
    SignupComponent,
    FileMenuComponent,
    RequestFeatureComponent,
    ReportBugComponent,
    ContactDevstudioComponent,
    FooterComponent,
    AppPlayerComponent,
    PublishAppDialog,
    AppSettingsDialogComponent,
    AppSubmissionsComponent,
    AdminComponent,
    AppCardComponent,
    AppDetailsPageComponent,
    LoadingBarComponent,
    SubmitExternalAppComponent,
    TodoComponent,
    IxTableComponent
  ],
  imports: [
    BrowserModule,
    BidiModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AceEditorModule,
    IxAngularElementsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule
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
  entryComponents: [PublishAppDialog, AppSettingsDialogComponent]
})
export class AppModule { }
