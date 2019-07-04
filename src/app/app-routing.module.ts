import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppEditorComponent } from './app-editor/app-editor.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  { 
    path: 'app-editor',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
