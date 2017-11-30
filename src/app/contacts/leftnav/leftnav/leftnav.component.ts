import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {Label} from '../../../store/models/label';
import {Router} from '@angular/router';
import {Util} from '../../../core/services/util';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserService} from '../../../core/services/user-service';
import {NotImplementedComponent} from '../../../shared/components/not-implemented/not-implemented.component';
import {EditLabelComponent} from '../edit-label/edit-label.component';
import * as _ from 'lodash';
import {DeleteLabelComponent} from '../delete-label/delete-label.component';
import {DeleteLabelMode} from '../../../store/enums/deleteLabelMode.enum';
import {ContactsService} from '../../../core/services/contacts.service';

@Component({
  selector: 'dk-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavComponent {
  @HostBinding('class.closed') leftNavClosed;
  labels = {
    contacts: <Label>{id: 'contacts', name: 'Contacts', icon: 'label', noEdit: true},
    arrExtras: [
      <Label>{id: 'settings', name: 'Settings', icon: 'settings', noEdit: true},
      <Label>{id: 'sendFeedback', name: 'Send Feedback', icon: 'sms_failed', noEdit: true},
      <Label>{id: 'help', name: 'Help', icon: 'help', noEdit: true}
    ],
    addLabel: <Label>{id: 'addLabel', name: 'Create label', icon: 'add'},

  };


  constructor(protected store: Store, protected router: Router, private mdDialog: MatDialog,
              private userService: UserService, private contactsService: ContactsService) {
    store.setVal('selectedLabel', this.labels.contacts);

    store.subscribe(state => {
      this.leftNavClosed = state.leftNavClosed;
    });
    store.subscribeContacts(contacts => {
      this.labels.contacts.numContacts = contacts.length;
    });
  }

  showAllContacts(event, label) {
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.router.navigateByUrl('/');
    this.store.setVal('selectedLabel', label);
  }

  showLabelContacts(event, label) {
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.router.navigate(['/', label.id]);
    this.store.setVal('selectedLabel', label);
  }


  handleLabel(label) {
    if (Util.isGuid(label.id)) {
      this.router.navigate(['/', label.id]);
      this.store.setVal('selectedLabel', label);
    } else {
      switch (label.id) {
        case 'contacts':
          this.router.navigateByUrl('/');
          this.store.setVal('selectedLabel', label);
          break;
        case 'addLabel':

          break;
        default:
          console.log(label.id);
          break;
      }
    }
  }

  deleteLabel(event, label) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }

    if (label.numContacts === 0) {
      this.userService.deleteLabel(this.store.state.user, label)
        .subscribe(x => x);
    } else {

      const config = <MatDialogConfig>{
        width: '336px',
        height: '281px',
        data: {
          label: {...label}
        }
      }
      this.mdDialog.open(DeleteLabelComponent, config)
        .afterClosed().subscribe(results => {
        if (results.deleteMode) {
          if (results.deleteMode === DeleteLabelMode.keepContacts) {
            this.contactsService.removeLabelFromContacts(this.store.state.contacts, label.id)
              .subscribe(() => {
                this.userService.deleteLabel(this.store.state.user, label)
                  .subscribe(x => x);
              });
          } else if (results.deleteMode === DeleteLabelMode.deleteContacts) {
            this.contactsService.deleteAllWithLabel(this.store.state.contacts, label.id)
              .subscribe(() => {
                this.userService.deleteLabel(this.store.state.user, label)
                  .subscribe(x => x);
              });
          }
        }
      });
    }
  }



  editLabel(event, label, mode) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }

    const config = <MatDialogConfig>{
      width: '248px',
      height: '193px',
      data: {
        mode: mode,
        label: {...label},
        labelNames:
          this.store.state.user.labels.map(label => label.name)
      }
    }
    this.mdDialog.open(EditLabelComponent, config)
      .afterClosed().subscribe(results => {
      if (results) {
        if (mode === 'add') {
          this.store.state.user.labels.push(results.label);
        } else {
          _.find(this.store.state.user.labels, {id: results.label.id}).name = results.label.name;
        }
        this.store.state.user.labels = _.sortBy(this.store.state.user.labels, 'name');
        this.userService.updateUser(this.store.state.user)
          .subscribe(user => user);
      }
    });
  }

  showNotImplemented() {
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    const config = <MatDialogConfig>{
      width: '248px',
      height: '193px',
      data: {}
    }
    this.mdDialog.open(NotImplementedComponent, config);
  }



}
