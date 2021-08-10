import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CountryService {

  private COUNTRIES_API = 'https://restcountries.eu/rest/v2'

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any[]>{
      return this.http.get<any[]>(this.COUNTRIES_API + '/all')
  }
} 