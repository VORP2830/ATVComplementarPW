import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  addressForm!: FormGroup;
  user!: User;

  constructor(
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initializeForms();
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

  get uf() {
    return this.userForm.controls;
  }

  get af() {
    return this.addressForm.controls;
  }

  initializeForms() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.addressForm = this.fb.group({
      streetAvenue: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', Validators.required],
      number: [''],
      complement: [''],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }


  public save(): void {
    this.spinner.show();
    const updatedUser = { ...this.user, ...this.userForm.value };
    updatedUser.address = this.addressForm.value;

    this.userService.register(updatedUser).subscribe({
      next: () => {
        this.router.navigateByUrl('/home')
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }
}
