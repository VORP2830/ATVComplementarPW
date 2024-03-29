import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Passenger } from 'src/app/Models/passenger';
import { PassengerService } from 'src/app/Service/passenger.service';

@Component({
  selector: 'app-passengerDetail',
  templateUrl: './passengerDetail.component.html'
})
export class PassengerDetailComponent implements OnInit {
  passengerForm!: FormGroup;
  addressForm!: FormGroup;
  passengerId: number = 0;
  passenger = {} as Passenger;
  passengerSave: string = 'post';

  constructor(
    private fb: FormBuilder,
    private passengerService: PassengerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.createPassengerForm();
    this.createAddressForm();
    this.getPassenger();
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      showTime: true,
      timeInputFormat: 'HH:mm'
    };
  }

  createPassengerForm() {
    this.passengerForm = this.fb.group({
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

  public getPassenger(): void {
    const passengerId = this.activatedRoute.snapshot.paramMap.get('id');
    if (passengerId != null) {
      this.spinner.show();
      this.passengerSave = 'put';
      this.passengerService.getById(+passengerId).subscribe(
        (passenger: Passenger) => {
          this.passenger = { ...passenger };
          this.populateForms();
        },
        (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      ).add(() => this.spinner.hide());
    }
  }

  populateForms() {
    this.passengerForm.patchValue({
      name: this.passenger.name,
      dateOfBirth: this.passenger.dateOfBirth,
      cpf: this.passenger.cpf
    });

    this.addressForm.patchValue({
      streetAvenue: this.passenger.address.streetAvenue,
      district: this.passenger.address.district,
      zipCode: this.passenger.address.zipCode,
      number: this.passenger.address.number,
      complement: this.passenger.address.complement,
      state: this.passenger.address.state,
      city: this.passenger.address.city
    });
  }

  public save(): void {
    this.spinner.show();
    if (this.passengerForm.valid && this.addressForm.valid) {
      const passengerData = this.passengerForm.value;
      const addressData = this.addressForm.value;

      if (this.passengerSave == 'post') {
        const passenger = { ...passengerData, address: addressData };

        this.passengerService.post(passenger).subscribe({
          next: (result: any) => {
            this.toastr.success('Passageiro salvo com sucesso', "Sucesso");
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      } else {
        const passenger = { id: this.passenger.id, ...passengerData, address: addressData };

        this.passengerService.put(passenger).subscribe({
          next: () => {
            this.toastr.success('Passageiro salvo com sucesso', "Sucesso")
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      }
    }
  }
}
