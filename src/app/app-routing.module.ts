import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminAreaGuardService } from './admin/admin-area-guard.service';
import { AppSubmissionsComponent } from './admin/app-submissions/app-submissions.component';
import { AppEditorComponent } from './app-editor/app-editor.component';
import { AppPlayerComponent } from './app-player/app-player.component';
import { ROUTE_PLAY, ROUTE_APP_DETAILS } from './constants';
import { ContactDevstudioComponent } from './contact-devstudio/contact-devstudio.component';
import { HomeComponent } from './home/home.component';
import { ReportBugComponent } from './report-bug/report-bug.component';
import { RequestFeatureComponent } from './request-feature/request-feature.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { AppDetailsPageComponent } from './app-details-page/app-details-page.component';
import { SubmitExternalAppComponent } from './submit-external-app/submit-external-app.component';
import { TodoComponent } from './admin/todo/todo.component';

const routes: Routes = [
  { 
    path: 'app-editor',
    component: AppEditorComponent
  },
  { 
    path: 'app-editor/:appId',
    component: AppEditorComponent
  },
  { 
    path: ROUTE_PLAY + '/:appId',
    component: AppPlayerComponent
  },
  { 
    path: 'live-html-editor',
    component: AppEditorComponent
  },
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'category/:category',
    component: HomeComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignupComponent
  },
  {
    path: 'request-feature',
    component: RequestFeatureComponent
  },
  {
    path: 'bug-report',
    component: ReportBugComponent
  },
  
  {
    path: 'contact',
    component: ContactDevstudioComponent
  },
  
  {
    path: 'submit-external-app',
    component: SubmitExternalAppComponent
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAreaGuardService]
  },

  {
    path: 'admin/todo',
    component: TodoComponent,
    canActivate: [AdminAreaGuardService]
  },

  {
    path: ROUTE_APP_DETAILS + "/:appId",
    component: AppDetailsPageComponent
  },

  {
    path: 'admin/app-submissions',
    component: AppSubmissionsComponent,
    canActivate: [AdminAreaGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
