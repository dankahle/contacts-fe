import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {Label} from '../../../store/models/label';
import {Router} from '@angular/router';
import {Util} from '../../../core/services/util';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddLabelComponent} from '../add-label/add-label.component';
import {UserService} from '../../../core/services/user-service';


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

  editLabel(event, label) {
    event.stopPropagation()
    console.log('edit', label.name);
  }

  deleteLabel(event, label) {
    event.stopPropagation()
    console.log('delete', label.name);
  }

  addLabel(event) {
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }

    const config = <MatDialogConfig>{
      width: '400px',
      height: '400px',
      data: {labelNames: this.store.state.user.labels.map(label => label.name)}
    }
    this.mdDialog.open(AddLabelComponent, config)
      .afterClosed().subscribe(results => {
      if (results.label) {
        this.store.state.user.labels.push(results.label);
        this.store.state.user.labels.sort();
        this.userService.updateUser(this.store.state.user)
          .subscribe(user => user);
      }
    });
  }

  showNotImplemented() {

  }



}
