import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfUploaderComponent } from './pdf-uploader/pdf-uploader.component';


const routes: Routes = [
  { path: 'dashboard', component: PdfUploaderComponent },
  { path: 'election', component: PdfUploaderComponent },
  { path: 'upload', component: PdfUploaderComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
