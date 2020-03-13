import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PdfUploaderComponent } from './pdf-uploader/pdf-uploader.component';
import { PdfVerifierService } from './services/pdf-verifier.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PdfUploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
      PdfVerifierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
