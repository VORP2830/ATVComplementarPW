import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  model = {
    name: null,
    dateOfBirth: null,
    cpf: null,
    login: null,
    password: null,
    address: {
      streetAvenue: null,
      district: null,
      zipCode: null,
      number: null,
      complement: null,
      state: null,
      city: null,
    }
  };

  form!: FormGroup;

  constructor(
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.validation();
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  get f() {
    return this.form.controls;
  }

  public register() {
    console.log(this.model);
    this.spinner.show();
    this.userService.register(this.model).subscribe(
      () => this.router.navigateByUrl('/home'),
      (error: any) => {
        this.toastr.error(error.error.message);
      }
    ).add(() => this.spinner.hide());
  }

  public validation(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      cpf: [null, Validators.required],
      login: [null, Validators.required],
      password: [null, Validators.required],
      address: this.fb.group({
        streetAvenue: [null, Validators.required],
        district: [null, Validators.required],
        zipCode: [null, Validators.required],
        number: [null, Validators.required],
        complement: [null],
        state: [null, Validators.required],
        city: [null, Validators.required]
      })
    });
  }
}
