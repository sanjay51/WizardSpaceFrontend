import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppEditorComponent } from './app-editor/app-editor.component';

const routes: Routes = [
  { 
    path: 'app-editor',
    component: AppEditorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
