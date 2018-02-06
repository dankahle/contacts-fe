import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NG_VALIDATORS} from '@angular/forms';
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

@NgModule({
  imports: [
    CommonModule,
    MaterialIndexModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule
  ],
  declarations: [PageNotFoundComponent, ForbiddenNameValidator, MinValidator, MaxValidator, ProgressComponent, ErrorModalComponent,
    NotImplementedComponent],
  exports: [
    MaterialIndexModule, FlexLayoutModule, RouterModule, FormsModule,
    PageNotFoundComponent, ForbiddenNameValidator, MinValidator, MaxValidator, ProgressComponent, ErrorModalComponent,
    NotImplementedComponent],
  entryComponents: [ErrorModalComponent, NotImplementedComponent],
  providers: []
})
export class SharedModule {
}
