import {ApplicationRef, Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {Store} from '../../../store/store';
import {Label} from '../../../store/models/label';
import {ActivatedRoute, Router} from '@angular/router';
import {Util} from '../../../core/services/util';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserService} from '../../../core/services/user-service';
import {NotImplementedComponent} from '../../../shared/dialogs/not-implemented/not-implemented.component';
import {EditLabelComponent} from '../../dialogs/edit-label/edit-label.component';
import * as _ from 'lodash';
import {DeleteLabelComponent} from '../../dialogs/delete-label/delete-label.component';
import {DeleteLabelMode} from '../../../store/enums/deleteLabelMode.enum';
import {ContactsService} from '../../../core/services/contacts.service';
import {BreakpointChange, BreakpointDirection, BreakpointService} from '../../../core/services/breakpoint.service';
import {StoreUser} from '../../../store/store-user';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'dk-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavComponent {
  usr: StoreUser;
  wasClosed = false;
  hideLeftNav = false;
  labels = {
    contacts: <Label>{id: 'contacts', name: 'Contacts', icon: 'label', noEdit: true},
    arrExtras: [
      <Label>{id: 'settings', name: 'Settings', icon: 'settings', noEdit: true},
      <Label>{id: 'sendFeedback', name: 'Send Feedback', icon: 'sms_failed', noEdit: true},
      <Label>{id: 'help', name: 'Help', icon: 'help', noEdit: true}
    ],
    addLabel: <Label>{id: 'addLabel', name: 'Create label', icon: 'add', noEdit: true},

  };

  constructor(public store: Store, protected router: Router, private mdDialog: MatDialog,
              private userService: UserService, private contactsService: ContactsService,
              private route: ActivatedRoute, private appRef: ApplicationRef, private breakpoints: BreakpointService) {

    this.usr = this.store.usr;
    breakpoints
      .subscribe(change => {
        this.handleBreakpoints(change);
      });

    store.sub(state => {
      if (breakpoints.isActive('gt-sm')) {
        this.wasClosed = state.leftNavClosed;
      }
    });

    // hide the animation if xs/sm
    if (breakpoints.isActive('xs') || breakpoints.isActive('sm')) {
      this.store.pubLeftNavClosed(true);
      this.hideLeftNavFast();
    }
  } // end constructor

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
        height: '267px',
        backdropClass: 'bg-modal-backdrop',
        data: {
          label: {...label}
        }
      };
      this.mdDialog.open(DeleteLabelComponent, config)
        .afterClosed().subscribe(results => {
        if (results) {
          if (results.deleteMode === DeleteLabelMode.keepContacts) {
            this.contactsService.removeLabelFromContacts(this.store.con.contacts, label.id)
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
    this.userService.deleteLabel(this.usr.user, label)
      .subscribe(x => {
        // if we're deleting the selected label, set "contacts" to selected label
        if (this.store.selectedLabel) {
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
      backdropClass: 'bg-modal-backdrop',
      data: {
        mode: mode,
        label: {...label},
        labelNames:
          this.usr.user.labels.map(_label => _label.name)
      }
    };
    this.mdDialog.open(EditLabelComponent, config)
      .afterClosed().subscribe(_label => {
      if (_label) {
        if (mode === 'add') {
          this.usr.user.labels.push(_label);
        } else {
          _.find(this.usr.user.labels, {id: _label.id}).name = _label.name;
        }
        this.usr.user.labels = _.sortBy(this.usr.user.labels, lbl => lbl.name.toLowerCase());
        this.userService.updateUser(this.usr.user)
          .mergeMap(() => this.contactsService.updateLabelInContacts(this.store.con.contacts, _label))
          .subscribe(x => x);
      }
    });
  }

  showNotImplemented() {
    if (Util.keydownAndNotEnterOrSpace(event)) {
      return;
    }
    const config = <MatDialogConfig>{
      width: '214px',
      height: '138px',
      backdropClass: 'bg-modal-backdrop',
      data: {}
    };
    this.mdDialog.open(NotImplementedComponent, config);
  }

  handleBreakpoints(change: BreakpointChange) {
    if (this.breakpoints.isActive('lt-md') && _.includes(['md', 'lg', 'xl'], change.lastBreakpoint)) {
      this.store.pubLeftNavClosed(true);
    } else if (this.breakpoints.isActive('gt-sm') && _.includes(['xs', 'sm'], change.lastBreakpoint)) {
      this.store.pubLeftNavClosed(this.wasClosed);
      if (this.wasClosed) {
        this.hideLeftNavFast();
      }
    }
  }

  /**
   * hideLeftNavFast
   * @desc - we have a couple times when we need to close left nav "now" not transition, this does the trick
   */
  hideLeftNavFast() {
    this.hideLeftNav = true;
    setTimeout(() => {
      this.hideLeftNav = false;
      this.appRef.tick();
    }, 400);
  }

}
