import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './Guard/auth.guard';

import { LoginComponent } from './Pages/User/Login/Login.component';
import { UserComponent } from './Pages/User/User.component';
import { RegisterComponent } from './Pages/User/Register/Register.component';
import { ProfileComponent } from './Pages/User/Profile/Profile.component';
import { HomeComponent } from './Pages/home/home.component';
import { VehicleComponent } from './Pages/vehicle/vehicle.component';
import { VehicleDetailComponent } from './Pages/vehicle/vehicleDetail/vehicleDetail.component';
import { VehicleListComponent } from './Pages/vehicle/vehicleList/vehicleList.component';
import { DriverComponent } from './Pages/driver/driver.component';
import { DriverDetailComponent } from './Pages/driver/driverDetail/driverDetail.component';
import { DriverListComponent } from './Pages/driver/driverList/driverList.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'veiculos',
        component: VehicleComponent,
        children: [
          { path: 'detalhe', component: VehicleDetailComponent },
          { path: 'detalhe/:id', component: VehicleDetailComponent },
          { path: 'lista', component: VehicleListComponent },
        ]
      },
      {
        path: 'motoristas',
        component: DriverComponent,
        children: [
          { path: 'detalhe', component: DriverDetailComponent },
          { path: 'detalhe/:id', component: DriverDetailComponent },
          { path: 'lista', component: DriverListComponent },
        ]
      },
     ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'registro', component: RegisterComponent },
      { path: 'perfil', component: ProfileComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
