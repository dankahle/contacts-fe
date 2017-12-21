import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ContactListComponent} from './main/contact-list/contact-list.component';
import {ContactDetailComponent} from './main/contact-detail/contact-detail.component';
import {ContactDetailRouteComponent} from './main/contact-detail/contact-detail-route.component';
import {ContactListItemComponent} from './main/contact-list-item/contact-list-item.component';
import {HeaderComponent} from './header/header/header.component';
import {LeftnavComponent} from './leftnav/leftnav/leftnav.component';
import {LeftnavLabelComponent} from './leftnav/leftnav-label/leftnav-label.component';
import {EditLabelComponent} from './leftnav/edit-label-modal/edit-label.component';
import {DeleteLabelComponent} from './leftnav/delete-label-modal/delete-label.component';
import {ContactsPageService} from './contacts-page.service';
import {ContactSearchComponent} from './header/contact-search/contact-search.component';
import { ContactEditComponent } from './main/contact-edit/contact-edit.component';
import { ContactDeleteComponent } from './main/contact-delete/contact-delete.component';
import {ContactDetailService} from './contact-detail-service';
import { EditCloseComponent } from './main/edit-close/edit-close.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  declarations: [ContactListComponent, ContactDetailRouteComponent, ContactDetailComponent, ContactListItemComponent,
    LeftnavComponent, HeaderComponent, LeftnavLabelComponent, EditLabelComponent, DeleteLabelComponent, ContactSearchComponent,
    ContactEditComponent,
    ContactDeleteComponent,
    EditCloseComponent],
  exports: [RouterModule, LeftnavComponent, HeaderComponent],
  entryComponents: [ContactDetailComponent, EditLabelComponent, DeleteLabelComponent, ContactEditComponent,
    ContactDeleteComponent, EditCloseComponent],
  providers: [ContactsPageService, ContactDetailService]
})
export class ContactsPageModule {
  constructor(contactsPageService: ContactsPageService, openContactDetailService: ContactDetailService) {}
}
