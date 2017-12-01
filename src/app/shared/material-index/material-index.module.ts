import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule, MatDialogModule, MatExpansionModule, MatInputModule,
  MatProgressBarModule, MatRadioModule, MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserAnimationsModule, MatButtonModule, MatProgressBarModule, MatDialogModule, MatInputModule, MatExpansionModule,
    MatToolbarModule, MatDialogModule, MatRadioModule, MatAutocompleteModule],
  exports: [BrowserAnimationsModule, MatButtonModule, MatProgressBarModule, MatDialogModule, MatInputModule, MatExpansionModule,
    MatToolbarModule, MatDialogModule, MatRadioModule, MatAutocompleteModule],
})
export class MaterialIndexModule {
}
