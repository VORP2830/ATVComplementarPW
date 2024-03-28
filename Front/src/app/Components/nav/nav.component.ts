import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed = false;
  farmId!: number;
  modalRef!: any;

  onChange(id: number) {
    this.farmId = id;
  }

  constructor(
    private router: Router,
    public userService: UserService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private location: Location
    ) { }

  ngOnInit() {
  }

  openModal(event: any, template: TemplateRef<any>): void {
    event.stopPropagation();
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  logout(): void {
    localStorage.removeItem("user");
    this.router.navigateByUrl('/user/login');
  }
  showMenu(): boolean {
    return this.router.url != ('/user/login' || '/user/registro');
  }

  navigateToPage(): void {
    const currentUrl = this.router.url;
    if(currentUrl == '/dashboard'){
      location.reload()
    }
    else{
      this.router.navigate(['/dashboard'])
    }
  }

}
