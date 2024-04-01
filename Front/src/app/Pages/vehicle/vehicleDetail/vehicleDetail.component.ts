import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/Models/vehicle';
import { VehicleService } from 'src/app/Service/vehicle.service';

@Component({
  selector: 'app-vehicleDetail',
  templateUrl: './vehicleDetail.component.html'
})
export class VehicleDetailComponent implements OnInit {
  form!: FormGroup;
  vehicleId: number = 0;
  vehicle = {} as Vehicle;
  vehicleSystem: Vehicle[] = [];
  vehicleSave: string = 'post';

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getVehicle();
    this.validation();
  }

  public getVehicle(): void {
    const vehicleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (vehicleId != null) {
      this.spinner.show();
      this.vehicleSave = 'put';
      this.vehicleService.getById(+vehicleId).subscribe(
        (vehicle: Vehicle) => {
          this.vehicle = { ...vehicle };
          this.form.patchValue(this.vehicle);
        },
        (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      ).add(() => this.spinner.hide());
    }
  }

  public save(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.vehicleSave == 'post') {
        this.vehicle = { ... this.form.value }

        this.vehicleService.post(this.vehicle).subscribe({
          next: (result: any) => {
            this.toastr.success('Veiculo salvo com sucesso', "Sucesso");
            this.router.navigateByUrl('/veiculos/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      } else {
        this.vehicle = { id: this.vehicle.id, ... this.form.value }
        this.vehicleService.put(this.vehicle).subscribe({
          next: () => {
            this.toastr.success('Veiculo salvo com sucesso', "Sucesso");
            this.router.navigateByUrl('/veiculos/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      }
    }
  }

  get f(): any {
    return this.form.controls;
  }

  public validation(): void {
    this.form = this.fb.group({
      vehicleType: ['', Validators.required],
      plate: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      capacity: ['', Validators.required],
      driverCPF: ['', Validators.required],
    })
  }


}
