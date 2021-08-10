import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, NewUserInterface } from '../services/auth.service';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null  => {
    const pass = control.get('password')
    const repeat = control.get('repeatPassword')
    return pass && repeat && (pass.value !== repeat.value) ? { 'passwordConfirmError': true } : null
  } 

  newUserForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    lastName: ['', [Validators.required, Validators.maxLength(30)]],
    country: ['', Validators.required],
    province: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)*'), Validators.minLength(6)]],
    repeatPassword: ['', Validators.required],
    terms: [false, Validators.requiredTrue]
  }, { validators: this.passwordsMatch })

  countries: Observable<any[]>
  login = false;

  constructor(private fb: FormBuilder,
    private countryService: CountryService,
    private autService: AuthService,
    private router: Router) { 
    this.countries = this.countryService.getCountries()
  }

  ngOnInit(): void {
  }

  get name() {
    return this.newUserForm.get('name')
  }
  get lastName() {
    return this.newUserForm.get('lastName')
  }
  get country() {
    return this.newUserForm.get('country')
  }
  get province() {
    return this.newUserForm.get('province')
  }
  get email() {
    return this.newUserForm.get('email')
  }
  get phone() {
    return this.newUserForm.get('phone')
  }
  get password() {
    return this.newUserForm.get('password')
  }
  get repeatPassword() {
    return this.newUserForm.get('repeatPassword')
  }
  get terms() {
    return this.newUserForm.get('terms')
  }

  onCountryChanged(country: any) {
    this.province?.setValue(country.capital)
  }
  
  register() {
    let newUser: NewUserInterface = {
      name: this.name!.value,
      last_name: this.lastName!.value,
      country: this.country!.value,
      province: this.province!.value,
      mail: this.email!.value,
      phone: this.phone!.value,
      password: this.password!.value,

    }
    this.autService.signUp(newUser).then(res => {
      this.router.navigateByUrl('/list')
    }).catch(err => {
      console.log(err);
    })
  }

  openTerms($event: Event) {
    $event.preventDefault()
    //TODO
  }
  
  openLogin($event: Event) { 
    $event.preventDefault()
    this.login = true
  }
}
