import { FileUploadModule } from 'ng2-file-upload';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { UploadComponent } from './upload/upload.component';

import { DownloadsComponent } from './downloads/downloads.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserviewComponent } from './userview/userview.component';
import {WebcamModule} from 'ngx-webcam';
import { CommentComponent } from './comment/comment.component';
import { ReplyCommentsComponent } from './reply-comments/reply-comments.component';
import { ChildboxComponent } from './childbox/childbox.component';

import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    ViewModeComponent,
    UploadComponent,
    DownloadsComponent,
    RegistrationComponent,
    UserviewComponent,
    CommentComponent,
    ReplyCommentsComponent,
    ChildboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FileUploadModule,
    WebcamModule,
    NgPipesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
