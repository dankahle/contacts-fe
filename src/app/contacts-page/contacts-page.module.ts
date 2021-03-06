import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ContactListComponent} from './main/contact-list/contact-list.component';
import {ContactDetailComponent} from './dialogs/contact-detail/contact-detail.component';
import {ContactDetailRouteComponent} from './dialogs/contact-detail/contact-detail-route.component';
import {ContactListItemComponent} from './main/contact-list-item/contact-list-item.component';
import {HeaderComponent} from './header/header/header.component';
import {LeftnavComponent} from './leftnav/leftnav/leftnav.component';
import {LeftnavLabelComponent} from './leftnav/leftnav-label/leftnav-label.component';
import {EditLabelComponent} from './dialogs/edit-label/edit-label.component';
import {DeleteLabelComponent} from './dialogs/delete-label/delete-label.component';
import {ContactsPageService} from './contacts-page.service';
import {ContactSearchComponent} from './header/contact-search/contact-search.component';
import { ContactEditComponent } from './dialogs/contact-edit/contact-edit.component';
import { ContactDeleteComponent } from './dialogs/contact-delete/contact-delete.component';
import {ContactDetailService} from './contact-detail-service';
import { ContactEditCloseComponent } from './dialogs/contact-edit-close/contact-edit-close.component';

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
    ContactEditCloseComponent],
  exports: [RouterModule, LeftnavComponent, HeaderComponent],
  entryComponents: [ContactDetailComponent, EditLabelComponent, DeleteLabelComponent, ContactEditComponent,
    ContactDeleteComponent, ContactEditCloseComponent],
  providers: [ContactsPageService, ContactDetailService]
})
export class ContactsPageModule {
  constructor(contactsPageService: ContactsPageService, openContactDetailService: ContactDetailService) {}
}
