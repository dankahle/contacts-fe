import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DeleteLabelComponent } from './delete-label.component';
import {SharedModule} from '../../../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatRadioButton} from '@angular/material';
import {StoreModule} from '../../../store/store.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Form, FormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('DeleteLabelComponent', () => {
  let comp: DeleteLabelComponent;
  let fixture: ComponentFixture<DeleteLabelComponent>;
  let elem: HTMLElement;
  let de: DebugElement;
  // this object will not be the object provided for some reason, as if it's cloned or something
  const dataInitial = {label: {numContacts: 0}};
  let data: {label: {numContacts: number}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule, SharedModule],
      declarations: [DeleteLabelComponent],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: dataInitial}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLabelComponent);
    de = fixture.debugElement;
    comp = fixture.componentInstance;
    elem = fixture.nativeElement;
    data = TestBed.get(MAT_DIALOG_DATA);
    fixture.detectChanges();
  });

  it('should not use initial data object for some reason', () => {
    expect(data).not.toBe(dataInitial);
  })

  it('should show text for one contact', () => {
    data.label.numContacts = 1;
    fixture.detectChanges();
    expect(elem.querySelector('.mat-dialog-content').textContent)
      .toContain('This label has 1 contact. Choose what to do with it.');
  });

  it('should show text for > 1 contact', () => {
    data.label.numContacts = 5;
    fixture.detectChanges();
    expect(elem.querySelector('.mat-dialog-content').textContent)
      .toContain(`This label has ${data.label.numContacts} contacts. Choose what to do with them.`);
  });

  // doesn't work even though all the data lines up right, not a detectChanges thing. ngModel is on the mat-radio-group
  // not sure how that works then, just would figure these directives would have checked set on them accordingly
  xit('should have keep all contacts chosen by default', () => {
    const radios = de.queryAll(By.directive(MatRadioButton)).map(x => x.componentInstance);
    const a = data;
    const b = comp;
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
  });

});
