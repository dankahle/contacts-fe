import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import 'hammerjs';
import {LoginModule} from './login/login.module';
import {Store} from './store/store';
import {RoutingModule} from './routing/routing.module';
import {ContactsPageModule} from './contacts-page/contacts-page.module';
import {Contact} from './store/models/contact';

@NgModule({
  imports: [
    BrowserModule,
    LoginModule,
    CoreModule,
    SharedModule,
    ContactsPageModule,
    RoutingModule
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
