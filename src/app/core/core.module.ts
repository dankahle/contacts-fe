import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '../store/store';
import {ProgressService} from './services/progress.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SpinnerInterceptor} from './interceptors/spinner.interceptor';
import {TimingInterceptor} from './interceptors/timing.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {Init1, Init2, Init3, Init4, Init5} from './services/init-service';
import {ValidateService} from './services/validate.service';
import {ModifyRequestInterceptor} from './interceptors/modify-request.interceptor';
import {InitializationGuard} from './guards/initialization.guard';
import {AuthGuard} from './guards/auth.guard';
import {UserService} from './services/user-service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [HttpClientModule],
  providers: [Store, Init1, Init2, Init3, Init4, Init5, ProgressService, UserService,
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ModifyRequestInterceptor, multi: true},
    ValidateService,
    InitializationGuard, AuthGuard
  ]
})
export class CoreModule {
}
