import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/Service/report.service';
import { ReportTransportStatistics } from 'src/app/Models/report';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  public report: ReportTransportStatistics = {} as ReportTransportStatistics;
  public firstDayOfMonth!: any;
  public lastDayOfMonth!: any;

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.setDates();
    this.getReport();
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      showTime: false
    };
  }

  setDates() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.firstDayOfMonth = firstDayOfMonth;
    this.lastDayOfMonth = lastDayOfMonth;
  }

  getReport() {
    this.spinner.show();
    this.reportService.getReport(formatDate(this.firstDayOfMonth, 'yyyy-MM-ddTHH:mm:ssZ', 'en-US'), formatDate(this.lastDayOfMonth, 'yyyy-MM-ddTHH:mm:ssZ', 'en-US'))
      .subscribe({
        next: (result: any) => {
          this.report = result;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }
}
