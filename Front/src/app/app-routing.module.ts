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
import { PassengerComponent } from './Pages/passenger/passenger.component';
import { PassengerDetailComponent } from './Pages/passenger/passengerDetail/passengerDetail.component';
import { PassengerListComponent } from './Pages/passenger/passengerList/passengerList.component';
import { TransportComponent } from './Pages/transport/transport.component';
import { TransportDetailComponent } from './Pages/transport/transportDetail/transportDetail.component';
import { TransportListComponent } from './Pages/transport/transportList/transportList.component';
import { ReportsComponent } from './Pages/reports/reports.component';

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
      {
        path: 'passageiros',
        component: PassengerComponent,
        children: [
          { path: 'detalhe', component: PassengerDetailComponent },
          { path: 'detalhe/:id', component: PassengerDetailComponent },
          { path: 'lista', component: PassengerListComponent },
        ]
      },
      {
        path: 'transportes',
        component: TransportComponent,
        children: [
          { path: 'detalhe', component: TransportDetailComponent },
          { path: 'detalhe/:id', component: TransportDetailComponent },
          { path: 'lista', component: TransportListComponent },
        ]
      },
      {
        path: 'relatorios',
        component: ReportsComponent
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
