import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadPageComponent } from './pages/file-upload-page/file-upload-page.component';
import { FileVerifyPageComponent } from './pages/file-verify-page/file-verify-page.component';


const routes: Routes = [
  { path: 'verify', component: FileVerifyPageComponent },
  { path: 'upload', component: FileUploadPageComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
