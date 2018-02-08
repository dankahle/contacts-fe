import {AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Chance} from 'chance';
import {Label} from '../../../store/models/label';
import * as _ from 'lodash';
import {AbstractControl, FormControl, NgForm, NgModel, ValidatorFn, Validators} from '@angular/forms';

const chance = new Chance();

@Component({
  selector: 'dk-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditLabelComponent implements AfterViewInit {
  @ViewChild('name') name: NgModel;
  placeholder: string;
  title: string;
  orgName: string;
  addMode = false;
  editMode = false;
  log = console.log;
  label: Label;

  constructor(protected dialogRef: MatDialogRef<EditLabelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    data.labelNames = data.labelNames.map(name => name.toLowerCase());
    if (data.mode === 'add') {
      this.addMode = true;
      this.placeholder = 'Create label';
      this.label = <Label>{
        id: chance.guid(),
        name: '',
        icon: 'label',
        numContacts: 0
      };
    } else {
      this.editMode = true;
      this.placeholder = 'Rename label';
      this.label = _.cloneDeep(data.label);
      this.orgName = this.label.name;
    }
  }

  ngAfterViewInit() {
    this.name.control.setValidators([Validators.required, this.nameAlreadyExistsValidator()]);
  }

  nameAlreadyExists() {
    if (this.editMode && this.label.name.trim().toLowerCase() === this.orgName.toLowerCase()) {
      return false;
    } else if (_.includes(this.data.labelNames, this.label.name.trim().toLowerCase())) {
       return true;

    } else {
      return false;
    }
  }

  nameAlreadyExistsValidator(): ValidatorFn {
    return ((control: AbstractControl): {[key: string]: any} => {
      return this.nameAlreadyExists() ? {'nameAlreadyExists': {value: control.value}} : null;
    });
  }

  submit(form) {
    if (form.valid) {
      this.label.name = this.label.name.trim();
      this.dialogRef.close(this.label);
    }
  }




}
