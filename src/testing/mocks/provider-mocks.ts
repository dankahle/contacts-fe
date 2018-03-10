import {ObservableMedia} from '@angular/flex-layout';
import {ObservableMediaMock} from './observable-media-mock';
import {createStore} from './store-mock';
import {Store} from '../../app/store/store';
import {ContactsService} from '../../app/core/services/contacts.service';
import {UserService} from '../../app/core/services/user-service';
import {ContactsPageService} from '../../app/contacts-page/contacts-page.service';
import {MatDialog, MatDialogRef} from '@angular/material';

export const providerMocks = [];
providerMocks.push({provide: ObservableMedia, useClass: ObservableMediaMock});
providerMocks.push({provide: Store, useValue: createStore()});

export const contactsServiceMock = jasmine.createSpyObj('ContactsService',
  ['getAll', 'getOne', 'addOne', 'updateOne', 'deleteOne', 'updateMany',
    'deleteAllWithLabel', 'updateLabelInContacts', 'removeLabelFromContacts', 'hasLabel', 'toggleLabel',
    'removeLabelFromContact', 'getLabelsForMenu', 'syncLabelsForApi']);
providerMocks.push({provide: ContactsService, useValue: contactsServiceMock});

export const userServiceMock = jasmine.createSpyObj('UserService',
  ['getUser', 'addUser', 'updateUser', 'deleteLabel', 'getLabelById']);
providerMocks.push({provide: UserService, useValue: userServiceMock});

export const contactsPageService = jasmine.createSpyObj(['updateLabelCounts', 'openContactEdit'])
providerMocks.push({provide: ContactsPageService, useValue: contactsPageService});

export const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
providerMocks.push({provide: MatDialogRef, useValue: matDialogRef});

export const matDialog = jasmine.createSpyObj('MatDialog', ['open']);
providerMocks.push({provide: MatDialog, useValue: matDialog});




