import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/Models/Pagination';
import { Transport } from 'src/app/Models/transport';
import { TransportService } from 'src/app/Service/transport.service';

@Component({
  selector: 'app-transportList',
  templateUrl: './transportList.component.html'
})
export class TransportListComponent implements OnInit {
  public transports: Transport[] = [];
  modalRef?: BsModalRef;
  transportId: number = 0;
  public pagination: Pagination = new Pagination();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private transportSerivce: TransportService
  ) { }

  ngOnInit() {
    this.getTransports();
  }

  public getTransports() {
    this.spinner.show();
    this.transportSerivce.getTransports(this.pagination.currentPage, this.pagination.itemsPerPages)
      .subscribe({
        next: (result: any) => {
          this.transports = result.result;
          this.pagination = result.pagination;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, transportId: number): void {
    event.stopPropagation();
    this.transportId = transportId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.spinner.show();
    this.modalRef?.hide();
    this.transportSerivce.delete(this.transportId).subscribe({
      next: (result: any) => {
        this.toastr.success("Excluido com sucesso!", "Deletado");
        this.getTransports();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  public detail(id: number): void {
    this.router.navigate([`/transportes/detalhe/${id}`]);
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getTransports()
  }

}
