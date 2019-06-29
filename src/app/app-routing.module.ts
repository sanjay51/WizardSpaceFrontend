import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppEditorComponent } from './app-editor/app-editor.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
    path: 'app-editor',
    component: AppEditorComponent
  },
  { 
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
