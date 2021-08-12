import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CommonComponentsModule } from './common-components/common-components.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Interceptor } from './services/interceptor';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonComponentsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'es'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    AuthGuard,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
