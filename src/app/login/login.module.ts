import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {LoginService} from './login.service';
import {SplashComponent} from './splash/splash.component';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    SharedModule,
    CoreModule
  ],
  declarations: [LoginComponent, SplashComponent],
  exports: [LoginComponent, SplashComponent],
  providers: [LoginService]
})
export class LoginModule {
}
