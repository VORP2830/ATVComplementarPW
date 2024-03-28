import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

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



@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    DateFormat,
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
    DriverListComponent
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
