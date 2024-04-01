import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html'
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  addressForm!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.initializeForms();
    this.getUser();
  }

  initializeForms() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      login: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', [Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]]
    });

    this.addressForm = this.fb.group({
      id: [],
      streetAvenue: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', Validators.required],
      number: [''],
      complement: [''],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
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

  getUser(): void {
    this.spinner.show();
    this.userService.getUser().subscribe(
      (user: User) => {
        this.user = user;
        this.populateUserForm(user);
        this.populateAddressForm(user.address);
      },
      (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }).add(() => this.spinner.hide());
  }

  populateUserForm(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      cpf: user.cpf,
      login: user.login,
      dateOfBirth: user.dateOfBirth,
      password: user.password
    });
  }

  populateAddressForm(address: any): void {
    this.addressForm.patchValue({
      id: address.id,
      streetAvenue: address.streetAvenue,
      district: address.district,
      zipCode: address.zipCode,
      number: address.number,
      complement: address.complement,
      state: address.state,
      city: address.city
    });
  }

  get uf() {
    return this.userForm.controls;
  }

  get af() {
    return this.addressForm.controls;
  }

  save(): void {
    this.spinner.show();
    console.log(this.addressForm)
    const updatedUser = { ...this.user, ...this.userForm.value };
    updatedUser.address = this.addressForm.value;

    this.userService.put(updatedUser).subscribe({
        next: () => {
            this.toastr.success('Usuário salvo com sucesso', 'Sucesso');
        },
        error: (error: any) => {
            this.toastr.error(error.error.message, 'Erro');
        }
    }).add(() => this.spinner.hide());
}


  resetUserForm(): void {
    this.userForm.reset();
  }

  resetAddressForm(): void {
    this.addressForm.reset();
  }
}
