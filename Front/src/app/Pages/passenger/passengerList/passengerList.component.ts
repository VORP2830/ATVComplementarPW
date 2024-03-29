import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/Models/Pagination';
import { Passenger } from 'src/app/Models/passenger';
import { PassengerService } from 'src/app/Service/passenger.service';

@Component({
  selector: 'app-passengerList',
  templateUrl: './passengerList.component.html'
})
export class PassengerListComponent implements OnInit {
  public passengers: Passenger[] = [];
  modalRef?: BsModalRef;
  passengerId: number = 0;
  public pagination: Pagination = new Pagination();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private passengerSerivce: PassengerService
  ) { }

  ngOnInit() {
    this.getPassengers();
  }

  public getPassengers() {
    this.spinner.show();
    this.passengerSerivce.getPassengers(this.pagination.currentPage, this.pagination.itemsPerPages)
      .subscribe({
        next: (result: any) => {
          this.passengers = result.result;
          this.pagination = result.pagination;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, passengerId: number): void {
    event.stopPropagation();
    this.passengerId = passengerId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.spinner.show();
    this.modalRef?.hide();
    this.passengerSerivce.delete(this.passengerId).subscribe({
      next: (result: any) => {
        this.toastr.success("Excluido com sucesso!", "Deletado");
        this.getPassengers();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  public detail(id: number): void {
    this.router.navigate([`/passageiros/detalhe/${id}`]);
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getPassengers()
  }
}
