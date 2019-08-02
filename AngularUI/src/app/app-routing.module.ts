import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { DeviceComponent } from './devices/device/device.component';
 
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home', component: HomeComponent},
  {path: 'users', component: UserComponent, children:[
    {path: 'registration', component: RegistrationComponent},
   
  ]},
  {
    path: 'devices', children: [
      { path: '', component: DevicesComponent },
      { path: 'edit/:id', component: DeviceComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
