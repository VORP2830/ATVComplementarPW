import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Driver } from 'src/app/Models/driver';
import { Pagination } from 'src/app/Models/Pagination';
import { DriverService } from 'src/app/Service/driver.service';

@Component({
  selector: 'app-driverList',
  templateUrl: './driverList.component.html'
})
export class DriverListComponent implements OnInit {
  public drivers: Driver[] = [];
  modalRef?: BsModalRef;
  vehicletId: number = 0;
  public pagination: Pagination = new Pagination();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private driverSerivce: DriverService
  ) { }

  ngOnInit() {
    this.getDrivers();
  }

  public getDrivers() {
    this.spinner.show();
    this.driverSerivce.getDrivers(this.pagination.currentPage, this.pagination.itemsPerPages)
      .subscribe({
        next: (result: any) => {
          this.drivers = result.result;
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
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.spinner.show();
    this.modalRef?.hide();
    this.driverSerivce.delete(this.vehicletId).subscribe({
      next: (result: any) => {
        this.toastr.success("Excluido com sucesso!", "Deletado");
        this.getDrivers();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  public detail(id: number): void {
    this.router.navigate([`/motoristas/detalhe/${id}`]);
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getDrivers()
  }

}
