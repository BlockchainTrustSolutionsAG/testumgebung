import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FileValidatorService } from './services/file-validator.service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FileUploadPageComponent } from './pages/file-upload-page/file-upload-page.component';
import { FileValidatePageComponent } from './pages/file-validate-page/file-validate-page.component';
import { FileInformationComponent } from './components/file-information/file-information.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FileInputComponent,
    FileUploadPageComponent,
    FileValidatePageComponent,
    FileInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
      FileValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
