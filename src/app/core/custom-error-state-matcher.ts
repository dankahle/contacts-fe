import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // Error when invalid control is dirty, touched, or submitted
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
