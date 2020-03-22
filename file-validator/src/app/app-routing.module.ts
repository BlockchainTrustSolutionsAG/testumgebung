import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadPageComponent } from './pages/file-upload-page/file-upload-page.component';
import { FileValidatePageComponent } from './pages/file-validate-page/file-validate-page.component';


const routes: Routes = [
  { path: 'validate', component: FileValidatePageComponent },
  { path: 'upload', component: FileUploadPageComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
