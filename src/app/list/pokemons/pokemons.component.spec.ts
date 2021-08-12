import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

import { PokemonsComponent } from './pokemons.component';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let pokemonServiceMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonsComponent ],
      imports: [ 
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: PokemonService, useClass: PokemonServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input search', () => {
    const element = fixture.debugElement.query(By.css('input'));
    expect(element.nativeNode.id).toBe('search');
  });

  it('should contain select input', () => {
    const element = fixture.debugElement.query(By.css('select'));
    expect(element.nativeNode.id).toBe('page-select');
  });

  it('should contain pokemons list', () => {
    const element = fixture.debugElement.query(By.css('ul'));
    expect(element.nativeNode.className).toBe('pokemons');
  });

  it('should show no list when no pokemons are available', () => {
    const element = fixture.debugElement.queryAll(By.css('li'));
    expect(element.length).toBe(0);
  });

  it('should show one pokemon', () => {
    component.results = [{
      name: 'pikachu'
    }];
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('li'));
    expect(element.length).toBe(1);
  });

  it('should show 20 pokemons when there are 20 pokemons', () => {
    const results: any = [];
    for (let i = 0; i < 20; i++) {
      results.push({
        name: i
      });
    }
    component.results = results;
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('li'));
    expect(element.length).toBe(20);
  });

  it('Compare button should be disabled when less than 2 pokemons are selected', () => {
    component.selected = [{name: 'pikachu'}]
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#compare-btn'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('Compare button should be enabled when 2 or more pokemons are selected', () => {
    component.selected = [{name: 'pikachu'}, {name: 'charmander'}]
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#compare-btn'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

});
class PokemonServiceMock {
  getPokemons(): Observable<any> {
    return of({
      count: 0,
      results: [],
      next: '/next-url'
    });
  }
}
