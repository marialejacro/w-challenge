import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonComponentsModule } from '../common-components/common-components.module';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AutocompleteLibModule,
        CommonComponentsModule
      ],
      declarations: [
        RegisterComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: CountryService, useClass: CountryServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain navigation bar', () => {
    const element = fixture.debugElement.query(By.css('app-navigation-bar'));
    expect(element.nativeNode.localName).toBe('app-navigation-bar');
  });

  it('should contain footer', () => {
    const element = fixture.debugElement.query(By.css('app-footer'));
    expect(element.nativeNode.localName).toBe('app-footer');
  });

  it('should contain register form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element.nativeNode.localName).toBe('form');
  });

  it('should contain name, lastname, email, country, phone, password and repeat assword inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs[0].nativeNode.id).toBe('first-name');
    expect(inputs[1].nativeNode.id).toBe('last-name');
    expect(inputs[2].nativeNode.id).toBe('email');
    expect(inputs[3].nativeNode.placeholder).toBe('País');
    expect(inputs[4].nativeNode.id).toBe('phone');
    expect(inputs[5].nativeNode.id).toBe('password');
    expect(inputs[6].nativeNode.id).toBe('repeat-password');
  });

  /* Test First Name */
  it('should update the value of the name input', () => {
    const input = fixture.nativeElement.querySelector('#first-name');
    const event = createNewEvent('input');
  
    input.value = 'Name';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.name?.value).toEqual('Name');
  });

  it('Name should be valid when input has less than 30 characters', () => {
    const input = fixture.nativeElement.querySelector('#first-name');
    const event = createNewEvent('input');
  
    input.value = 'Name';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.name?.status).toBe('VALID');
  });

  it('Name should be invalid when input is empty', () => {
    const input = fixture.nativeElement.querySelector('#first-name');
    const event = createNewEvent('input');
  
    input.value = '';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.name?.status).toEqual('INVALID');
    expect(fixture.componentInstance.name?.errors?.required).toEqual(true);
  });

  it('Name should be invalid when input has more than 30 characters', () => {
    const input = fixture.nativeElement.querySelector('#first-name');
    const event = createNewEvent('input');
  
    input.value = 'Some very very super laarge Name';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.name?.status).toBe('INVALID');
  });

  /* Test Last Name */
  it('should update the value of the last name input', () => {
    const input = fixture.nativeElement.querySelector('#last-name');
    const event = createNewEvent('input');
  
    input.value = 'Last name';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.lastName?.value).toEqual('Last name');
  });

  it('Name should be valid when input has less than 30 characters', () => {
    const input = fixture.nativeElement.querySelector('#last-name');
    const event = createNewEvent('input');
  
    input.value = 'Last Name';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.lastName?.status).toBe('VALID');
  });

  it('Name should be invalid when input is empty', () => {
    const input = fixture.nativeElement.querySelector('#last-name');
    const event = createNewEvent('input');
  
    input.value = '';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.lastName?.status).toEqual('INVALID');
    expect(fixture.componentInstance.lastName?.errors?.required).toEqual(true);
  });

  it('Name should be invalid when input has more than 30 characters', () => {
    const input = fixture.nativeElement.querySelector('#last-name');
    const event = createNewEvent('input');
  
    input.value = 'Some very very super laarge Last Name';
    input.dispatchEvent(event);
  
    expect(fixture.componentInstance.lastName?.status).toBe('INVALID');
  });

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

  /* Tests Phone */
  it('should update the value of the phone input', () => {
    const input = fixture.nativeElement.querySelector('#phone');
    const event = createNewEvent('input');

    input.value = '123456';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.phone?.value).toEqual('123456');
  });

  it('Phone should valid with only numbers and less than 10', () => {
    const input = fixture.nativeElement.querySelector('#phone');
    const event = createNewEvent('input');

    input.value = '123456';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.phone?.status).toEqual('VALID');
  });
  
  it('Phone should invalid if contains not numbers', () => {
    const input = fixture.nativeElement.querySelector('#phone');
    const event = createNewEvent('input');

    input.value = '1234s';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.phone?.status).toEqual('INVALID');
    expect(fixture.componentInstance.phone?.errors?.pattern).toBeTruthy;
  });

  it('Phone should invalid if contains more than 10', () => {
    const input = fixture.nativeElement.querySelector('#phone');
    const event = createNewEvent('input');

    input.value = '12345678911';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.phone?.status).toEqual('INVALID');
    expect(fixture.componentInstance.phone?.errors?.maxlength).toBeTruthy;
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

  /* Tests Repeat Password */
  it('should update the value of the repeat password input', () => {
    const input = fixture.nativeElement.querySelector('#repeat-password');
    const event = createNewEvent('input');

    input.value = '1testpass';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.repeatPassword?.value).toEqual('1testpass');
  });

  it('Repeat password should be valid when input is not empty', () => {
    const input = fixture.nativeElement.querySelector('#repeat-password');
    const event = createNewEvent('input');

    input.value = '1testpass';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.repeatPassword?.status).toBe('VALID');
  });

  it('Repeat password should be invalid when input is empty', () => {
    const input = fixture.nativeElement.querySelector('#repeat-password');
    const event = createNewEvent('input');

    input.value = '';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.repeatPassword?.status).toEqual('INVALID');
    expect(fixture.componentInstance.repeatPassword?.errors?.required).toEqual(true);
  });

  it('New user form should be valid when all inputs are valid', () => {
    component.name?.setValue('Name');
    component.lastName?.setValue('Last Name');
    component.email?.setValue('test@mail.com');
    component.country?.setValue('Colombia');
    component.province?.setValue('Bogota');
    component.phone?.setValue('123456');
    component.password?.setValue('1testpass');
    component.repeatPassword?.setValue('1testpass');
    component.terms?.setValue(true);
    fixture.detectChanges();

    expect(component.newUserForm.status).toBe('VALID');
  });

  it('Register button should be disabled when new user form is invalid', () => {
    component.email?.setValue('test.com');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('Register button should be enabled when login form valid', () => {
    component.name?.setValue('Name');
    component.lastName?.setValue('Last Name');
    component.email?.setValue('test@mail.com');
    component.country?.setValue('Colombia');
    component.province?.setValue('Bogota');
    component.phone?.setValue('123456');
    component.password?.setValue('1testpass');
    component.repeatPassword?.setValue('1testpass');
    component.terms?.setValue(true);
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeFalsy();
  });

});

class AuthServiceMock { }
class CountryServiceMock {
  getCountries(): Observable<any[]> {
    return of([])
  }
}
function createNewEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}