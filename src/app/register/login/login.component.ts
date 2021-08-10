import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CredentialsInterface } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() register = new EventEmitter();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)*'), Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, 
    private autService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }
  login() {
    let newUser: CredentialsInterface = {
      email: this.email!.value,
      password: this.password!.value,
    }
    this.autService.login(newUser).then(res => {
      this.router.navigateByUrl('/list')
    }).catch(err => {
      console.log(err);
    })
  }

  goToRegister($event: Event) {
    $event.preventDefault()
    this.register.emit('')
  }
}
