import {AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Chance} from 'chance';
import {Label} from '../../../store/models/label';
import * as _ from 'lodash';
import {AbstractControl, FormControl, NgModel, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'dk-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditLabelComponent implements OnInit {
  @ViewChild('name') name: NgModel;
  placeholder: string;
  title: string;
  orgName: string;
  addMode = false;
  editMode = false;
  log = console.log;


  constructor(protected dialogRef: MatDialogRef<EditLabelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    const chance = new Chance();
    data.labelNames = data.labelNames.map(name => name.toLowerCase());
    if (data.mode === 'add') {
      this.addMode = true;
      this.placeholder = 'Create label';
      data.label = <Label>{
        id: chance.guid(),
        name: '',
        icon: 'label'
      };
    } else {
      this.editMode = true;
      this.orgName = data.label.name;
    }
  }

  ngOnInit() {
    this.name.control.setValidators([Validators.required, this.nameAlreadyExistsValidator()]);
  }

  nameAlreadyExists() {
    if (this.editMode && this.data.label.name.toLowerCase() === this.orgName.toLowerCase()) {
      return false;
    } else if (_.includes(this.data.labelNames, this.data.label.name.toLowerCase())) {
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

  submit(form, data) {
    if (form.valid) {
      this.dialogRef.close(data);
    }
  }




}
