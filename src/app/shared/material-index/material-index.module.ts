import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatDialogModule, MatExpansionModule, MatInputModule,
  MatProgressBarModule, MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserAnimationsModule, MatButtonModule, MatProgressBarModule, MatDialogModule, MatInputModule, MatExpansionModule,
    MatToolbarModule, MatDialogModule],
  exports: [BrowserAnimationsModule, MatButtonModule, MatProgressBarModule, MatDialogModule, MatInputModule, MatExpansionModule,
    MatToolbarModule, MatDialogModule],
})
export class MaterialIndexModule {
}
