import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Driver } from 'src/app/Models/driver';
import { DriverService } from 'src/app/Service/driver.service';

@Component({
  selector: 'app-driverDetail',
  templateUrl: './driverDetail.component.html'
})
export class DriverDetailComponent implements OnInit {
  driverForm!: FormGroup;
  addressForm!: FormGroup;
  driverId: number = 0;
  driver = {} as Driver;
  driverSave: string = 'post';

  constructor(
    private fb: FormBuilder,
    private driverService: DriverService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.createDriverForm();
    this.createAddressForm();
    this.getDriver();
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  createDriverForm() {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  createAddressForm() {
    this.addressForm = this.fb.group({
      streetAvenue: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', Validators.required],
      number: [''],
      complement: [''],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  public getDriver(): void {
    const driverId = this.activatedRoute.snapshot.paramMap.get('id');
    if (driverId != null) {
      this.spinner.show();
      this.driverSave = 'put';
      this.driverService.getById(+driverId).subscribe(
        (driver: Driver) => {
          this.driver = { ...driver };
          this.populateForms();
        },
        (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      ).add(() => this.spinner.hide());
    }
  }

  populateForms() {
    this.driverForm.patchValue({
      name: this.driver.name,
      dateOfBirth: this.driver.dateOfBirth,
      cpf: this.driver.cpf
    });

    this.addressForm.patchValue({
      streetAvenue: this.driver.address.streetAvenue,
      district: this.driver.address.district,
      zipCode: this.driver.address.zipCode,
      number: this.driver.address.number,
      complement: this.driver.address.complement,
      state: this.driver.address.state,
      city: this.driver.address.city
    });
  }

  public save(): void {
    this.spinner.show();
    if (this.driverForm.valid && this.addressForm.valid) {
      const driverData = this.driverForm.value;
      const addressData = this.addressForm.value;

      if (this.driverSave == 'post') {
        const driver = { ...driverData, address: addressData };

        this.driverService.post(driver).subscribe({
          next: (result: any) => {
            this.toastr.success('Motorista salvo com sucesso', "Sucesso");
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      } else {
        const driver = { id: this.driver.id, ...driverData, address: addressData };

        this.driverService.put(driver).subscribe({
          next: () => {
            this.toastr.success('Motorista salvo com sucesso', "Sucesso")
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      }
    }
  }
}
