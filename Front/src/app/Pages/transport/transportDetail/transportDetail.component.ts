import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Transport } from 'src/app/Models/transport';
import { TransportService } from 'src/app/Service/transport.service';

@Component({
  selector: 'app-transportDetail',
  templateUrl: './transportDetail.component.html'
})
export class TransportDetailComponent implements OnInit {
  form!: FormGroup;
  transportId: number = 0;
  transport = {} as Transport;
  transportSave: string = 'post';
  price: number = 0;

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.createTransportForm();
    this.getTransport();
    this.subscribeToTransportKmChanges();
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      showTime: true,
      timeInputFormat: 'HH:mm'
    };
  }

  createTransportForm() {
    this.form = this.fb.group({
      passengerCpf: ['', Validators.required],
      transportKm: ['' , Validators.required],
      vehiclePlate: ['', Validators.required],
      dateHourTransport: ['', Validators.required]
    });
  }

  public subscribeToTransportKmChanges() {
    this.form.get('transportKm')!.valueChanges.subscribe(value => {
      this.calculatePrice(value);
    });
  }

  public calculatePrice(transportKm: number) {
    if(transportKm == null)
    {
      transportKm = this.form.get('transportKm')!.value.ToNumber();
    }
    return this.price = transportKm * 0.4;
  }

  public getTransport(): void {
    const transportId = this.activatedRoute.snapshot.paramMap.get('id');
    if (transportId != null) {
      this.spinner.show();
      this.transportSave = 'put';
      this.transportService.getById(+transportId).subscribe(
        (transport: Transport) => {
          this.transport = { ...transport };
          this.populateForms();
          this.calculatePrice(transport.transportKm);
        },
        (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      ).add(() => this.spinner.hide());
    }
  }

  populateForms() {
    this.form.patchValue({
      passengerCpf: this.transport.passengerCpf,
      transportKm: this.transport.transportKm,
      vehiclePlate: this.transport.vehiclePlate,
      dateHourTransport: this.transport.dateHourTransport,
    });
  }

  public save(): void {
    this.spinner.show();
    if (this.form.valid) {
      const transportData = this.form.value;
      if (this.transportSave == 'post') {
        const transport = { ...transportData };

        this.transportService.post(transport).subscribe({
          next: (result: any) => {
            this.toastr.success('Transporte salvo com sucesso', "Sucesso");
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      } else {
        const transport = { id: this.transport.id, ...transportData};

        this.transportService.put(transport).subscribe({
          next: () => {
            this.toastr.success('Transporte salvo com sucesso', "Sucesso")
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      }
    }
  }
}
