import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {State} from './models/state';
import {Store} from './store';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [State, Store]
})
export class StoreModule {

}
