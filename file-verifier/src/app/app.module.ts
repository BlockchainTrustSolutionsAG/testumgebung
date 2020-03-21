import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileVerifierService } from './services/file-verifier.service';
import { AdminViewComponent } from './admin-view/admin-view.component';
import {FormsModule} from "@angular/forms";
import { FooterComponent } from './footer/footer.component';
import { FileInputComponent } from './file-input/file-input.component';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FileUploaderComponent,
    AdminViewComponent,
    FooterComponent,
    FileInputComponent,
    FileUploadPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
      FileVerifierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
