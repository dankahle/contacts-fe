import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeftnavComponent} from './leftnav/leftnav.component';
import {HeaderComponent} from './header/header.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LeftnavComponent, HeaderComponent],
  exports: [LeftnavComponent, HeaderComponent]
})
export class MainModule {
}
