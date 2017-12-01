import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ContactListComponent} from './main/contact-list/contact-list.component';
import {ContactDetailComponent} from './main/contact-detail/contact-detail.component';
import {ContactDetailRouteComponent} from './main/contact-detail/contact-detail-route.component';
import {ContactListItemComponent} from './main/contact-list-item/contact-list-item.component';
import {HeaderComponent} from './h1/header/header.component';
import {LeftnavComponent} from './leftnav/leftnav/leftnav.component';
import {LeftnavLabelComponent} from './leftnav/leftnav-label/leftnav-label.component';
import {EditLabelComponent} from './leftnav/edit-label/edit-label.component';
import {DeleteLabelComponent} from './leftnav/delete-label/delete-label.component';
import {ContactsPageService} from './contacts-page.service';
import {ContactSearchComponent} from './h1/contact-search/contact-search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  declarations: [ContactListComponent, ContactDetailRouteComponent, ContactDetailComponent, ContactListItemComponent,
    LeftnavComponent, HeaderComponent, LeftnavLabelComponent, EditLabelComponent, DeleteLabelComponent, ContactSearchComponent],
  exports: [RouterModule, LeftnavComponent, HeaderComponent],
  entryComponents: [ContactDetailComponent, EditLabelComponent, DeleteLabelComponent],
  providers: [ContactsPageService]
})
export class ContactsPageModule {
  constructor(contactsPageService: ContactsPageService) {}
}
