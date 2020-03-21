import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import {FileUploadPageComponent} from './file-upload-page/file-upload-page.component';


const routes: Routes = [
  { path: 'admin', component: FileUploadPageComponent },
  { path: 'election', component: FileUploaderComponent },
  { path: 'upload', component: FileUploaderComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
