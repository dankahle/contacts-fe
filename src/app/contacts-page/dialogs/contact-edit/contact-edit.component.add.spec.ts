import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ContactEditComponent} from './contact-edit.component';
import {SharedModule} from '../../../shared/shared.module';
import {Store} from '../../../store/store';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatInputModule, MatMenuModule} from '@angular/material';
import {getContacts} from '../../../../testing/mocks/store-mock';
import {getProviderMocks} from '../../../../testing/mocks/provider-mocks';
import {Contact} from '../../../store/models/contact';
import {ContactEditPOB} from './contact-edit.pob';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ContactsPageModule} from '../../contacts-page.module';
import {ContactsPageService} from '../../contacts-page.service';
import {Label} from '../../../store/models/label';
import {asyncData} from '../../../../testing/async-observable-helpers';
import {MoreActionsBase} from '../../main/more-actions-base';
import Spy = jasmine.Spy;
import {MaterialIndexModule} from '../../../shared/material-index/material-index.module';
import {FormsModule} from '@angular/forms';

fdescribe('ContactEditComponent (add)', () => {
  let comp: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;
  let de: DebugElement;
  const dataInitial = {mode: 'add'};
  let data: {contact: Contact};
  let po: ContactEditPOB;
  let elem;
  let dialogRef;
  let store;
  let contacts;
  let matDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialIndexModule, FormsModule],
      declarations: [ContactEditComponent],
      providers: getProviderMocks().concat([{provide: MAT_DIALOG_DATA, useValue: dataInitial}])
      // schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditComponent);
    comp = fixture.componentInstance;
    elem = fixture.nativeElement;
    de = fixture.debugElement;
    data = de.injector.get(MAT_DIALOG_DATA);
    dialogRef = de.injector.get(MatDialogRef);
    matDialog = de.injector.get(MatDialog);
    store = TestBed.get(Store);
    contacts = store.con.contacts;
    fixture.detectChanges();
    po = new ContactEditPOB(elem); // have ngIfs in template so need to detect changes before seting up po or stuff don't show up
  });

  it('should work', () => {

  });


});
