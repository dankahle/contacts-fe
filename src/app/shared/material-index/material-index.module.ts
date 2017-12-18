import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatInputModule, MatMenuModule,
  MatProgressBarModule, MatRadioModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserAnimationsModule, MatButtonModule, MatProgressBarModule, MatDialogModule, MatInputModule, MatExpansionModule,
    MatToolbarModule, MatDialogModule, MatRadioModule, MatAutocompleteModule, MatCheckboxModule, MatMenuModule, MatTooltipModule,
    MatMenuModule],
  exports: [BrowserAnimationsModule, MatButtonModule, MatProgressBarModule, MatDialogModule, MatInputModule, MatExpansionModule,
    MatToolbarModule, MatDialogModule, MatRadioModule, MatAutocompleteModule, MatCheckboxModule, MatMenuModule, MatTooltipModule,
    MatMenuModule],
})
export class MaterialIndexModule {
}
