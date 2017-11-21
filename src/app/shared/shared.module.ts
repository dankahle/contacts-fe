import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NG_VALIDATORS} from "@angular/forms";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ForbiddenNameValidator} from "./validators/forbidden-name.validator";
import {MinValidator} from "./validators/min.validator";
import {MaxValidator} from "./validators/max.validator";
import {MaterialIndexModule} from "./material-index/material-index.module";
import {ProgressComponent} from "./components/progress/progress.component";
import {ErrorModalComponent} from "./components/error-modal/error-modal.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    MaterialIndexModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [PageNotFoundComponent, ForbiddenNameValidator, MinValidator, MaxValidator, ProgressComponent, ErrorModalComponent],
  exports: [
    MaterialIndexModule,
    PageNotFoundComponent, ForbiddenNameValidator, MinValidator, MaxValidator, ProgressComponent, ErrorModalComponent],
  entryComponents: [ErrorModalComponent],
  providers: []
})
export class SharedModule { }
