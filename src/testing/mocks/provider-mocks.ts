import {ObservableMedia} from '@angular/flex-layout';
import {ObservableMediaMock} from './observable-media-mock';
import {createStore} from './store-mock';
import {Store} from '../../app/store/store';
import {ContactsService} from '../../app/core/services/contacts.service';
import {UserService} from '../../app/core/services/user-service';
import {ContactsPageService} from '../../app/contacts-page/contacts-page.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Provider} from '@angular/core';
import * as _ from 'lodash';
import {MatDialogMock, MatDialogRefMock} from './mat-dialog-mock';
import {asyncData} from '../async-observable-helpers';

export function getProviderMocks(...types): Provider[] {

  const providerMocks = [];
  providerMocks.push({provide: ObservableMedia, useClass: ObservableMediaMock});
  providerMocks.push({provide: Store, useValue: createStore()});

  const contactsService = jasmine.createSpyObj('ContactsService',
    ['getAll', 'getOne', 'addOne', 'updateOne', 'deleteOne', 'updateMany',
      'deleteAllWithLabel', 'updateLabelInContacts', 'removeLabelFromContacts', 'hasLabel', 'toggleLabel',
      'removeLabelFromContact', 'getLabelsForMenu', 'syncLabelsForApi']);
  contactsService.addOne.and.returnValue(asyncData(contactsService.addOne.calls.argsFor(0)));
  contactsService.updateOne.and.returnValue(asyncData(contactsService.addOne.calls.argsFor(0)));
  providerMocks.push({provide: ContactsService, useValue: contactsService});

  const userService = jasmine.createSpyObj('UserService',
    ['getUser', 'addUser', 'updateUser', 'deleteLabel', 'getLabelById']);
  providerMocks.push({provide: UserService, useValue: userService});

  const contactsPageService = jasmine.createSpyObj(['updateLabelCounts', 'openContactEdit'])
  providerMocks.push({provide: ContactsPageService, useValue: contactsPageService});

  const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  providerMocks.push({provide: MatDialogRef, useValue: matDialogRef});

  providerMocks.push({provide: MatDialog, useClass: MatDialogMock});
  providerMocks.push({provide: MatDialogRef, useClass: MatDialogRefMock});

  /*
    const matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    providerMocks.push({provide: MatDialog, useValue: matDialog});
  */

  if (types.length) {
    _.pullAllWith(providerMocks, types, provider => {
      if (provider.provide && _.includes(types, provider.provide) || _.includes(types, provider)) {
        return true;
      }
      return false;
    });
  }

  return providerMocks;
}





