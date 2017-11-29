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

@Component({
  selector: 'dk-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavComponent {
  @HostBinding('class.closed') leftNavClosed;
  labels = {
    contacts: <Label>{id: 'contacts', name: 'Contacts fsdfdsfadsfasdfasdfasdfsad', icon: 'label'},
    arrExtras: [
      <Label>{id: 'settings', name: 'Settings', icon: 'settings'},
      <Label>{id: 'sendFeedback', name: 'Send Feedback', icon: 'sms_failed'},
      <Label>{id: 'help', name: 'Help', icon: 'help'}
    ],
    addLabel: <Label>{id: 'addLabel', name: 'Create label', icon: 'add'},

  };


  constructor(protected store: Store, protected router: Router, private mdDialog: MatDialog, private userService: UserService) {
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

  keydown(event, label) { // Trigger the click event from the keyboard
    if (Util.isKeydown(event)) {
      this.handleLabel(label);
    }
  }

  deleteLabel(event, label) {
    event.stopPropagation()
    console.log('delete', label.name);
  }

  editLabel(event, label, mode) {
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }

    const config = <MatDialogConfig>{
      width: '248px',
      height: '193px',
      data: {
        mode: mode,
        label: label,
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
        this.store.state.user.labels.sort();
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
