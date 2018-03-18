import {ComponentFixture} from '@angular/core/testing';
import {ContactEditComponent} from './contact-edit.component';
import {By} from '@angular/platform-browser';
import {MatSelect} from '@angular/material';


export class ContactEditPOB {
  submit;
  cancel;
  name
  nameError;
  company;
  jobTitle;
  emails;
  emailErrors;
  emailLabels;
  phoneSelects;
  phoneMatSelects = [];
  phones;
  phoneLabels;
  addrs;
  addrLabels;
  websites;
  websiteLabels;
  notes;
  sectionEmails;
  sectionPhones;
  sectionAddrs;
  sectionWebsites;
  clearButtons;
  addButtons;

  constructor(private elem: HTMLElement, private fixture: ComponentFixture<ContactEditComponent>) {
    this.getElements();
  }

  getElements() {
    this.submit = this.elem.querySelector('.button-submit');
    this.cancel = this.elem.querySelector('.button-cancel');
    this.name = this.elem.querySelector('input.po-name');
    this.nameError = this.elem.querySelector('.name-error');
    this.company = this.elem.querySelector('input.company');
    this.jobTitle = this.elem.querySelector('input.job-title');
    this.emails = this.elem.querySelectorAll('input.email');
    this.emailErrors = this.elem.querySelectorAll('mat-error.email-error');
    this.emailLabels = this.elem.querySelectorAll('input.email-label');

    this.phoneSelects = this.fixture.debugElement.queryAll(By.directive(MatSelect));
    this.phoneSelects.forEach((sel, idx) => {
      this.phoneMatSelects[idx] = sel.injector.get(MatSelect);
    });

    this.phones = this.elem.querySelectorAll('input.phone');
    this.phoneLabels = this.elem.querySelectorAll('input.phone-label');
    this.addrs = this.elem.querySelectorAll('textarea.addr');
    this.addrLabels = this.elem.querySelectorAll('input.addr-label');
    this.websites = this.elem.querySelectorAll('input.site');
    this.websiteLabels = this.elem.querySelectorAll('input.site-label');
    this.notes = this.elem.querySelector('textarea.notes');
    this.sectionEmails = this.elem.querySelectorAll('.section.email');
    this.sectionPhones = this.elem.querySelectorAll('.section.phone');
    this.sectionAddrs = this.elem.querySelectorAll('.section.addr');
    this.sectionWebsites = this.elem.querySelectorAll('.section.website');
    this.clearButtons = this.elem.querySelectorAll('.clear');
    this.addButtons = this.elem.querySelectorAll('.add');
  }

}
