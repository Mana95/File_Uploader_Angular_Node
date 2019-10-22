import { CommentComponent } from './comment/comment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { Role } from './_models';
import { LoginComponent } from './login/login.component';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserviewComponent } from './userview/userview.component';

const routes: Routes = [

  {
    path: 'downloads',
    component: DownloadsComponent,
    canActivate: [AuthGuard]
  },

  {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
  },
  {
      path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.Admin] }
  },
  {
    path: 'viewmode',
    component: ViewModeComponent,
    canActivate: [AuthGuard]
},
{
  path: 'userview',
  component: UserviewComponent,
  canActivate: [AuthGuard]
},

{
  path: 'Registration',
  component: RegistrationComponent
},
{
  path: 'comment',
  component: CommentComponent
},
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'downloads/:jobid', component: DownloadsComponent

  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }