import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

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
    country: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)*'), Validators.minLength(6)]],
    repeatPassword: ['', Validators.required],
    terms: [false, Validators.requiredTrue]
  }, { validators: this.passwordsMatch });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('register init');
    
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
  
  onSubmit() {
    console.warn(this.newUserForm.errors);
  }
}
