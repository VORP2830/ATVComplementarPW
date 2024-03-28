import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/Models/UserLogin';
import { UserService } from 'src/app/Service/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  model = {} as UserLogin;

  constructor(
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
  }

  public login() {
    this.spinner.show();
    this.userService.login(this.model).subscribe(
      () => { this.router.navigateByUrl('/home'); },
      (error: any) => {
        this.toastr.error(error.error.Message);
      }
    ).add(() => this.spinner.hide());
  }

}
