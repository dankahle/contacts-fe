import {ApplicationRef, Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {Label} from '../../../store/models/label';
import {ActivatedRoute, Router} from '@angular/router';
import {Util} from '../../../core/services/util';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserService} from '../../../core/services/user-service';
import {NotImplementedComponent} from '../../../shared/components/not-implemented/not-implemented.component';
import {EditLabelComponent} from '../edit-label-modal/edit-label.component';
import * as _ from 'lodash';
import {DeleteLabelComponent} from '../delete-label-modal/delete-label.component';
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
  lastWidth: number;
  wasClosed = false;
  leftNavCuttoff = 768;
  hideLeftNav = false;
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
              private userService: UserService, private contactsService: ContactsService,
              private route: ActivatedRoute, private appRef: ApplicationRef) {

    store.subscribe(state => {
      this.leftNavClosed = state.leftNavClosed;
    });

    if (window.innerWidth < this.leftNavCuttoff) {
      // hack: left nav transitions on entry, even though class is closed
      this.hideLeftNav = true;
      setTimeout(() => {
        this.hideLeftNav = false;
        appRef.tick();
      }, 1000);
    }
    window.onresize = this.handleResize.bind(this);
  }

  showAllContacts(event, label) {
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.router.navigateByUrl('/');
  }

  showLabelContacts(event, label) {
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    this.router.navigate(['/', label.id]);
  }

  deleteLabel(event, label) {
    event.stopPropagation();
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }

    if (label.numContacts === 0) {
      this._deleteLabel(label);
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
              .subscribe(() => this._deleteLabel(label));
          } else if (results.deleteMode === DeleteLabelMode.deleteContacts) {
            this.contactsService.deleteAllWithLabel(label.id)
              .subscribe(() => this._deleteLabel(label));
          }
        }
      });
    }
  }

  _deleteLabel(label) {
    this.userService.deleteLabel(this.store.state.user, label)
      .subscribe(x => {
        // if we're deleting the selected label, set "contacts" to selected label
        if (this.store.state.selectedLabel) {
          this.router.navigateByUrl('/');
        }
      });
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
          .mergeMap(() => this.contactsService.updateLabelInContacts(this.store.state.contacts, label))
          .subscribe(x => x);
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

  handleResize(event) {
    const currentWidth = window.innerWidth;
    // what we want is going to cutoff leftnav disappears if it's showing and going from cutoff to bigger, always open it
    // hmmm we could save if they had it closed going to cutoff and not do it

    if (this.lastWidth === undefined) {
      if (currentWidth < this.leftNavCuttoff) {
        this.leftNavClosed = true;
      }
    } else {
      if (this.lastWidth > this.leftNavCuttoff && currentWidth < this.leftNavCuttoff) {
        // to  cutoff from big !closed >> closed and closed stays closed
        this.wasClosed = this.leftNavClosed;
        this.store.setVal('leftNavClosed', true);
        this.appRef.tick();
        // if leftnav does not have closed class, add it
      } else if (this.lastWidth < this.leftNavCuttoff && currentWidth > this.leftNavCuttoff) {
        // to big from cutoff closed >> !closed (unless was closed going in) and open stays same
        if (!this.wasClosed) {
          this.wasClosed = false;
          this.store.setVal('leftNavClosed', false);
          this.appRef.tick();
        }
      }
    }
    this.lastWidth = currentWidth;
  }

}
