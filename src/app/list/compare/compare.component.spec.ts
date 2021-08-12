import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonService } from 'src/app/services/pokemon.service';

import { CompareComponent } from './compare.component';

describe('CompareComponent', () => {
  let component: CompareComponent;
  let fixture: ComponentFixture<CompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: PokemonService, useClass: PokemonServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no pokemons when pokemons array is empty', () => {
    const element = fixture.debugElement.queryAll(By.css('.pokemon'));
    expect(element.length).toBe(0);
  });

  it('should show 3 pokemons when pokemons array length is 3', () => {
    component.pokemons = [
      { id:1, name: 'pikachu', height: 1, weight: 3, sprites: {front_default: 'link' }}, 
      { id:2, name: 'charmander', height: 1, weight: 3, sprites: {front_default: 'link' }},
      { id:3, name: 'kakuna', height: 1, weight: 3,  sprites: {front_default: 'link' }}
    ]
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('.pokemon'));
    expect(element.length).toBe(3);
  });

  it('Return link should navigate to pokemons page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    const element: HTMLAnchorElement = fixture.nativeElement.querySelector('.back');
    element.click();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/list']), 
    { skipLocationChange: false, replaceUrl: false, state: undefined })
  });

});

class PokemonServiceMock {}