import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../../store/models/contact';
import 'rxjs/add/operator/startWith';
import {Store} from '../../../store/store';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ContactDetailComponent} from '../../main/contact-detail/contact-detail.component';
import {Messages} from '../../../store/models/messages';

@Component({
  selector: 'dk-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactSearchComponent implements OnInit {
  @ViewChild('searchCtrl') searchCtrl;
  @ViewChild('searchCtrl', {read: ElementRef}) searchElem;
  searchVal = '';
  log = console.log;
  hideInput = true;

  constructor(protected store: Store, private mdDialog: MatDialog) {
  }

  myControl = new FormControl();

  filteredContacts: Observable<Contact[]>;

  ngOnInit() {
    this.filteredContacts = this.searchCtrl.control.valueChanges
      .startWith(null)
      .map(contact => contact && typeof contact === 'object' ? contact.name : contact)
      .map(name => name ? this.filter(name) : []);
  }

  filter(name: string): Contact[] {
    return this.store.con.contacts.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  getDisplayName(contact: Contact): string {
    return contact ? contact.name || contact.company : '';
  }

  getDisplayNameAndEmail(contact: Contact): string {

    let prefix = this.getDisplayName(contact);
    if (contact.emails && contact.emails.length > 0) {
      return prefix += ` - ${contact.emails[0].email}`;
    } else {
      return prefix;
    }
  }

  displayContact(event) {
    console.log(event.option.value.name);
    this.searchVal = '';
    this.searchElem.nativeElement.blur();
    this.store.emit(Messages.openContactDetail, event.option.value);
  }

  clearText() {
    this.searchVal = '';
    this.searchElem.nativeElement.focus();
  }

}
