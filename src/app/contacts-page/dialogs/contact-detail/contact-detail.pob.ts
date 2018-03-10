

export class ContactDetailPOB {
  pic;
  title;
  labels
  btn_edit;
  btn_moreActions;
  btn_close;
  labelTags;
  company ;
  emails;
  phones;
  addresses;
  websites;
  notes;
  emailsA;
  phonesA;
  addressesA;
  websitesA;

  constructor(private elem: HTMLElement) {
    this.init();
  }

  init() {
    this.pic = this.elem.querySelector('.header .pic');
    this.title = this.elem.querySelector('.header .name');
    this.labels = this.elem.querySelectorAll('.header .labels .label');
    this.btn_edit = this.elem.querySelector('.header .edit');
    this.btn_moreActions = this.elem.querySelector('.header .more-actions');
    this.btn_close = this.elem.querySelector('.header .close');
    this.labelTags = this.elem.querySelectorAll('.labels .label');
    this.company = this.elem.querySelector('.section.company .value-div');
    this.emails = this.elem.querySelectorAll('.section.emails .value-div .value');
    this.phones = this.elem.querySelectorAll('.section.phones .value-div .value');
    this.addresses = this.elem.querySelectorAll('.section.addresses .value-div .value');
    this.websites = this.elem.querySelectorAll('.section.websites .value-div .value');
    this.notes = this.elem.querySelector('.section.notes .value-text');

    this.emailsA = this.elem.querySelectorAll('.section.emails .value-div a');
    this.phonesA = this.elem.querySelectorAll('.section.phones .value-div a');
    this.addressesA = this.elem.querySelectorAll('.section.addresses .value-div a');
    this.websitesA = this.elem.querySelectorAll('.section.websites .value-div a');
  }

}
