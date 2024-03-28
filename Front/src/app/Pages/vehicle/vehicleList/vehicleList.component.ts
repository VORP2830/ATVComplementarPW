import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/Models/Pagination';
import { Vehicle } from 'src/app/Models/vehicle';
import { VehicleService } from 'src/app/Service/vehicle.service';

@Component({
  selector: 'app-vehicleList',
  templateUrl: './vehicleList.component.html'
})
export class VehicleListComponent implements OnInit {
  public vehicles: Vehicle[] = [];
  modalRef?: BsModalRef;
  vehicletId: number = 0;
  public pagination: Pagination = new Pagination();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private vehicleSerivce: VehicleService
  ) { }

  ngOnInit() {
    this.getVehicles();
  }

  public getVehicles() {
    this.spinner.show();
    this.vehicleSerivce.getVehicles(this.pagination.currentPage, this.pagination.itemsPerPages)
      .subscribe({
        next: (result: any) => {
          this.vehicles = result.result;
          console.log(result.pagination)
          this.pagination = result.pagination;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, vehicletId: number): void {
    event.stopPropagation();
    this.vehicletId = vehicletId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.spinner.show();
    this.modalRef?.hide();
    this.vehicleSerivce.delete(this.vehicletId).subscribe({
      next: (result: any) => {
          this.toastr.success("Excluido com sucesso!", "Deletado");
          this.getVehicles();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  public detail(id: number): void {
    this.router.navigate([`/veiculos/detalhe/${id}`]);
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getVehicles()
  }

}
