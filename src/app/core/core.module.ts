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
import {InitializationGuard} from '../routing/guards/initialization.guard';
import {AuthGuard} from '../routing/guards/auth.guard';
import {UserService} from './services/user-service';
import {RouterModule} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material';
import {CustomErrorStateMatcher} from './custom-error-state-matcher';
import {ContactsService} from './services/contacts.service';
import {StoreModule} from '../store/store.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    StoreModule
  ],
  exports: [HttpClientModule, StoreModule],
  providers: [Store, Init1, Init2, Init3, Init4, Init5, ProgressService, UserService, ContactsService,
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ModifyRequestInterceptor, multi: true},
    ValidateService,
    InitializationGuard, AuthGuard,
    {provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher}
  ]
})
export class CoreModule {
}
