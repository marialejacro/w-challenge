import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain login form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element.nativeNode.localName).toBe('form');
  });

  it('should contain email and password inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const emailInput = inputs[0]
    const passInput = inputs[1]
    expect(emailInput.nativeNode.id).toBe('email');
    expect(passInput.nativeNode.id).toBe('password')
  });

  function createNewEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  /* Tests Email */
  it('should update the value of the email input', () => {
      const input = fixture.nativeElement.querySelector('#email');
      const event = createNewEvent('input');
    
      input.value = 'test@mail.com';
      input.dispatchEvent(event);
    
      expect(fixture.componentInstance.email?.value).toEqual('test@mail.com');
  });

  it('Email should be valid when input has email format', () => {
    const input = fixture.nativeElement.querySelector('#email');
    const event = createNewEvent('input');
  
    input.value = 'test@mail.com';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.email?.status).toBe('VALID');
  });

  it('Email should be invalid when input is empty', () => {
    const input = fixture.nativeElement.querySelector('#email');
    const event = createNewEvent('input');
  
    input.value = '';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.email?.status).toEqual('INVALID');
    expect(fixture.componentInstance.email?.errors?.required).toEqual(true);
  });

  it('Email should be invalid with not correct email format', () => {
    const input = fixture.nativeElement.querySelector('#email');
    const event = createNewEvent('input');
  
    input.value = 'test.com';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.email?.status).toEqual('INVALID');
    expect(fixture.componentInstance.email?.errors?.email).toEqual(true);
  });

  /* Tests Password */
  it('should update the value of the password input', () => {
    const input = fixture.nativeElement.querySelector('#password');
    const event = createNewEvent('input');
  
    input.value = '1testpass';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.password?.value).toEqual('1testpass');
  });

  it('Password should be valid when input matches pattern and has at least 6 characters', () => {
    const input = fixture.nativeElement.querySelector('#password');
    const event = createNewEvent('input');
  
    input.value = '1testpass';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.password?.status).toBe('VALID');
  });

  it('Password should be invalid when input is empty', () => {
    const input = fixture.nativeElement.querySelector('#password');
    const event = createNewEvent('input');
  
    input.value = '';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.password?.status).toEqual('INVALID');
    expect(fixture.componentInstance.password?.errors?.required).toEqual(true);
  });

  it('Password should be invalid when input contains special characters', () => {
    const input = fixture.nativeElement.querySelector('#password');
    const event = createNewEvent('input');
  
    input.value = '!23asdft';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.password?.status).toEqual('INVALID');
    expect(fixture.componentInstance.password?.errors?.pattern).toBeTruthy;
  });

  it('Password should be invalid when input has less than 6 characters', () => {
    const input = fixture.nativeElement.querySelector('#password');
    const event = createNewEvent('input');
  
    input.value = '123a2';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.password?.status).toEqual('INVALID');
    expect(fixture.componentInstance.password?.errors?.minlength)
      .toEqual({ requiredLength: 6, actualLength: 5 });
  });

  it('Login form should be valid when email and password are valid', () => {
    component.email?.setValue('test@mail.com');
    component.password?.setValue('1testpass');
    fixture.detectChanges();

    expect(component.loginForm.status).toBe('VALID');
  });

  it('Login button should be disabled when login form is invalid', () => {
    component.email?.setValue('test.com');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('Login button should be enabled when login form valid', () => {
    component.email?.setValue('test@mail.com');
    component.password?.setValue('1testpass');
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });

});

class AuthServiceMock {}


