import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {LoginService} from './login.service';

export const loginRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: LoginComponent},
];


@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(loginRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule {
}
