import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContactsModule} from './contacts/contacts.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import 'hammerjs';
import {LoginComponent} from './login/login/login.component';
import {LoginModule} from './login/login.module';
import {Globals} from './core/services/globals';
import {MainModule} from './main/main.module';
import {Store} from './core/services/store';

const appRoutes: Routes = [
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    LoginModule,
    ContactsModule,
    CoreModule,
    SharedModule,
    MainModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // initialize the Store
  constructor(store: Store, globals: Globals) {
  }
}
