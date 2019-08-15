import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppEditorComponent } from './app-editor/app-editor.component';
import { AppPlayerComponent } from './app-player/app-player.component';
import { ROUTE_PLAY } from './constants';
import { ContactDevstudioComponent } from './contact-devstudio/contact-devstudio.component';
import { HomeComponent } from './home/home.component';
import { ReportBugComponent } from './report-bug/report-bug.component';
import { RequestFeatureComponent } from './request-feature/request-feature.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
