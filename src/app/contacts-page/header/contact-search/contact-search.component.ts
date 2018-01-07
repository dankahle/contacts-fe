import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../../../store/models/contact';
import 'rxjs/add/operator/startWith';
import {Store} from '../../../store/store';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ContactDetailComponent} from '../../dialogs/contact-detail/contact-detail.component';
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
  filteredContacts: Observable<Contact[]>;

  constructor(protected store: Store, private mdDialog: MatDialog) {
  }

  ngOnInit() {
    this.filteredContacts = this.searchCtrl.control.valueChanges
      .startWith(null)
      // bug: somehow they end up setting the searchCtrl to a contact when you select one, there was code for this mind you
      // but you took it out, and it's still happening, so they're doing it I figure. This crashes the code of course
      // as it's expecting a string from that input. We'll look for string then
      .map(txt => txt && typeof(txt) === 'string' ? this.filter(txt) : []);
  }

  filter(txt: string): Contact[] {
    return this.store.con.contacts.filter(contact => {
      const val = txt.toLowerCase();
      return (contact.name && contact.name.toLowerCase().indexOf(val) !== -1) ||
        (contact.company && contact.company.toLowerCase().indexOf(val) !== -1);
    });
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
    // console.log(event.option.value.name);
    this.searchVal = '';
    this.searchElem.nativeElement.blur();
    this.store.con.pubOpenDetail(event.option.value);
  }

  clearText() {
    this.searchVal = '';
    this.searchElem.nativeElement.focus();
  }

}
