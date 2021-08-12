import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { CompareComponent } from './compare/compare.component';

import { ListComponent } from './list.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { FormsModule } from '@angular/forms';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'pokemons', component: PokemonsComponent },
          { path: 'compare',  component: CompareComponent }
        ]),
        HttpClientTestingModule,
        CommonComponentsModule,
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
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
});
