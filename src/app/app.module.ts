import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContactsModule} from './contacts/contacts.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import 'hammerjs';
import {LoginModule} from './login/login.module';
import {Store} from './store/store';

const appRoutes: Routes = [
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    LoginModule,
    CoreModule,
    SharedModule,
    ContactsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // initialize the Store
  constructor(store: Store) {
  }
}
