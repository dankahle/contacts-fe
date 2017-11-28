import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatDialogModule, MatExpansionModule, MatInputModule,
  MatProgressBarModule, MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserAnimationsModule, MatButtonModule, MatProgressBarModule, MatDialogModule, MatInputModule, MatExpansionModule,
    MatToolbarModule],
  exports: [BrowserAnimationsModule, MatButtonModule, MatProgressBarModule, MatDialogModule, MatInputModule, MatExpansionModule,
    MatToolbarModule],
})
export class MaterialIndexModule {
}
