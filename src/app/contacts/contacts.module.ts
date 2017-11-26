import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsService} from '../core/services/contacts.service';
import {CoreModule} from '../core/core.module';
import {RouterModule, Routes} from '@angular/router';
import {InitializationGuard} from '../core/guards/initialization.guard';
import {SharedModule} from '../shared/shared.module';
import {ContactListComponent} from './main/contact-list/contact-list.component';
import {ContactDetailComponent} from './main/contact-detail/contact-detail.component';
import {ContactDetailRouteComponent} from './main/contact-detail/contact-detail-route.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {ContactListItemComponent} from './main/contact-list-item/contact-list-item.component';
import {HeaderComponent} from './header/header.component';
import {LeftnavComponent} from './leftnav/leftnav/leftnav.component';
import {LeftnavLabelComponent} from './leftnav/leftnav-label/leftnav-label.component';

export const contactRoutes: Routes = [
  {
    path: '',
    component: ContactListComponent,
    canActivate: [AuthGuard, InitializationGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(contactRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [ContactListComponent, ContactDetailRouteComponent, ContactDetailComponent, ContactListItemComponent,
    LeftnavComponent, HeaderComponent, LeftnavLabelComponent],
  exports: [RouterModule, LeftnavComponent, HeaderComponent],
  entryComponents: [ContactDetailComponent],
  providers: [ContactsService]
})
export class ContactsModule {
}
