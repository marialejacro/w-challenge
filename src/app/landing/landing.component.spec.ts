import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AuthService } from '../services/auth.service';
import { LandingComponent } from './landing.component';
import { TranslateModule, TranslateService} from '@ngx-translate/core';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CommonComponentsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ LandingComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        TranslateService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
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

  it('should have welcome section', () => {
    const element = fixture.debugElement.query(By.css('#welcome'));
    expect(element.nativeNode.id).toBe('welcome');
  });

  it('should have follow us section', () => {
    const element = fixture.debugElement.query(By.css('#follow'));
    expect(element.nativeNode.id).toBe('follow');
  });

  it('should have benefits section', () => {
    const element = fixture.debugElement.query(By.css('#benefits'));
    expect(element.nativeNode.id).toBe('benefits');
  });

  it('should have follow us button', () => {
    const element = fixture.debugElement.query(By.css('#follow-btn'));
    expect(element.nativeNode.id).toBe('follow-btn');
  });

  it('should have know more button', () => {
    const element = fixture.debugElement.query(By.css('#more-btn'));
    expect(element.nativeNode.id).toBe('more-btn');
  });

});

class AuthServiceMock { 
  userLoggedIn() {
    return true
  }
}