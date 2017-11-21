import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LeftnavComponent, HeaderComponent],
  exports: [LeftnavComponent, HeaderComponent]
})
export class MainModule { }
