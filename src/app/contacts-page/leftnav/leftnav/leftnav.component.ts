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
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'dk-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LeftnavComponent {
  @HostBinding('class.closed') leftNavClosed;
  wasClosed = false;
  hideLeftNav = false;
  lastBreakpoint: string;
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
              private route: ActivatedRoute, private appRef: ApplicationRef, media: ObservableMedia) {

    media.asObservable()
      // .filter((change: MediaChange) => change.mqAlias === 'xs' || change.mqAlias === 'sm')
      .subscribe(change => {
        if (this.lastBreakpoint === undefined) {
          console.log('initlast', change.mqAlias);
          this.lastBreakpoint = change.mqAlias;
        }
        this.handleBreakpoints(change.mqAlias);
      });

    // hack: the @HostBinding above requires a local var, but we want to use global, so have to subscribe to global
    // to get the local required.
    store.subscribe(state => {
      this.leftNavClosed = state.leftNavClosed;
    });

    if (media.isActive('xs') || media.isActive('sm')) {
      // hack: left nav transitions on entry, even though class is closed, if we go "open" class then probably transitions open
      // initially. Not sure the answer to that then. Hide it on start for a sec if xs
      this.hideLeftNavFast();
    }
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

  handleBreakpoints(breakpoint) {
console.log(`${this.lastBreakpoint} >> ${breakpoint}`);
    switch (breakpoint) {
      case 'sm':
        // entering xs we close leftnav
        if (this.lastBreakpoint === 'md' || this.lastBreakpoint === 'lg' || this.lastBreakpoint === 'xl') {
          this.wasClosed = this.leftNavClosed;
          console.log('wasclosed set to: ', this.wasClosed);
          this.store.setVal('leftNavClosed', true);
        }
        break;
      case 'md':
        // entering
        if ((this.lastBreakpoint === 'xs' || this.lastBreakpoint === 'sm') && !this.wasClosed) {
          this.wasClosed = false;
          this.store.setVal('leftNavClosed', false);
          this.appRef.tick();
        }
        break;
    }
    this.lastBreakpoint = breakpoint;
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
