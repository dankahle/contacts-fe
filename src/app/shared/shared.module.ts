import {forwardRef, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ForbiddenNameValidator} from './validators/forbidden-name.validator';
import {MinValidator} from './validators/min.validator';
import {MaxValidator} from './validators/max.validator';
import {MaterialIndexModule} from './material-index/material-index.module';
import {ProgressComponent} from './components/progress/progress.component';
import {ErrorModalComponent} from './dialogs/error-modal/error-modal.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import { NotImplementedComponent } from './dialogs/not-implemented/not-implemented.component';
import {TrimInputValueDirective} from './accessors/trim-input-value.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialIndexModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule
  ],
  declarations: [PageNotFoundComponent, ForbiddenNameValidator, MinValidator, MaxValidator, ProgressComponent, ErrorModalComponent,
    NotImplementedComponent, TrimInputValueDirective],
  exports: [
    MaterialIndexModule, FlexLayoutModule, RouterModule, FormsModule,
    PageNotFoundComponent, ForbiddenNameValidator, MinValidator, MaxValidator, ProgressComponent, ErrorModalComponent,
    NotImplementedComponent, TrimInputValueDirective],
  entryComponents: [ErrorModalComponent, NotImplementedComponent],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TrimInputValueDirective),
    multi: true
  }]
})
export class SharedModule {
}
