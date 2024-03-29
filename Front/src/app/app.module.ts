import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserService } from './Service/user.service';
import { DriverService } from './Service/driver.service';
import { VehicleService } from './Service/vehicle.service';
import { PassengerService } from './Service/passenger.service';

import { JwtInterceptor } from './Interceptors/jwt.interceptor';

import { DateFormat } from './Helpers/DateFormat.pipe';
import { NavComponent } from './Components/nav/nav.component';
import { UserComponent } from './Pages/User/User.component';
import { LoginComponent } from './Pages/User/Login/Login.component';
import { RegisterComponent } from './Pages/User/Register/Register.component';
import { ProfileComponent } from './Pages/User/Profile/Profile.component';
import { TitleComponent } from './Components/title/title.component';
import { VehicleComponent } from './Pages/vehicle/vehicle.component';
import { VehicleDetailComponent } from './Pages/vehicle/vehicleDetail/vehicleDetail.component';
import { VehicleListComponent } from './Pages/vehicle/vehicleList/vehicleList.component';
import { DriverComponent } from './Pages/driver/driver.component';
import { DriverDetailComponent } from './Pages/driver/driverDetail/driverDetail.component';
import { DriverListComponent } from './Pages/driver/driverList/driverList.component';
import { PassengerComponent } from './Pages/passenger/passenger.component';
import { PassengerDetailComponent } from './Pages/passenger/passengerDetail/passengerDetail.component';
import { PassengerListComponent } from './Pages/passenger/passengerList/passengerList.component';
import { TransportService } from './Service/transport.service';
import { TransportComponent } from './Pages/transport/transport.component';
import { TransportDetailComponent } from './Pages/transport/transportDetail/transportDetail.component';
import { TransportListComponent } from './Pages/transport/transportList/transportList.component';
import { DateHourFormat } from './Helpers/DateHourFormat.pipe';
import { ReportsComponent } from './Pages/reports/reports.component';
import { ReportService } from './Service/report.service';



@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    DateFormat,
    DateHourFormat,
    NavComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    VehicleComponent,
    VehicleDetailComponent,
    VehicleListComponent,
    DriverComponent,
    DriverDetailComponent,
    DriverListComponent,
    PassengerComponent,
    PassengerDetailComponent,
    PassengerListComponent,
    TransportComponent,
    TransportDetailComponent,
    TransportListComponent,
    ReportsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      }),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    PaginationModule.forRoot(),
  ],
  providers: [
    UserService,
    VehicleService,
    DriverService,
    PassengerService,
    TransportService,
    ReportService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
