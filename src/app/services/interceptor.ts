import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(public http: HttpClient, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('restcountries') !== -1) {
      return next.handle(request)
    }
    const token = localStorage.getItem('token')
    if (token) {
      let cloneReq: HttpRequest<any> = request.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      })
      return next.handle(cloneReq).pipe(
        catchError((err: HttpErrorResponse) => {
          if(err.status === 401) {
            this.router.navigateByUrl('/login');
          }
          return throwError(err);
        })
      )
    }
    return next.handle(this.addHeaders(request))
  }

  private addHeaders(request: HttpRequest<any>): HttpRequest<any> {
    const headers =  new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let cloneReq: HttpRequest<any>
    cloneReq = request.clone({headers: headers})
    return cloneReq
  }
}
