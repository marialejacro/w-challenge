import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API = 'http://private-8e8921-woloxfrontendinverview.apiary-mock.com'

  constructor(private http: HttpClient) { 
  }

  signUp(userData: NewUserInterface) {
    return new Promise((resolve, reject )=> {
      this.http.post<TokenInterface>(this.AUTH_API + '/signup', userData).subscribe(res => {
        this.saveToken(res);
        resolve(res)
      }, err => {
        reject(err)
      })
    }) 
  }

  login(credentials: CredentialsInterface) {
    return new Promise((resolve, reject )=> {
      this.http.post<TokenInterface>(this.AUTH_API + '/login', credentials).subscribe(res => {
        this.saveToken(res);
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }

  getToken(): TokenInterface | null {
    const token = localStorage.getItem('token')
    if(token){
      return JSON.parse(token)
    } 
    return null
  }

  private saveToken(token: TokenInterface): void{
    localStorage.setItem('token', JSON.stringify(token))
  }

  userLoggedIn() {
    return this.getToken() ? true : false
  }

  logout() {
    localStorage.removeItem('token')
  }
}
export interface NewUserInterface {
  name: string,
  last_name: string,
  country: string,
  province: string,
  mail: string,
  phone: string,
  password: string,
}
export interface CredentialsInterface {
  email: string,
  password: string
}
export interface TokenInterface {
  token: string
}
