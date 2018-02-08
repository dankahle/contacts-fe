import { Directive, ElementRef, HostListener, Inject, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, DefaultValueAccessor, NgControl } from '@angular/forms';

/**
 * stolen from: https://github.com/khashayar/ng-trim-value-accessor but not working for material autocomplete
 * and matInput's ngModel.touched not working, so stole from a stackblitz fixed version in this issue:
 * https://github.com/khashayar/ng-trim-value-accessor/issues/11
 * The trim accessor for writing trimmed value and listening to changes that is
 * used by the {@link NgModel}, {@link FormControlDirective}, and
 * {@link FormControlName} directives.
 */
@Directive({
  selector: `
    input:not([matAutoComplete]),
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[formControlName],
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[formControl],
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[ngModel],
    textarea:not([readonly]):not(.ng-trim-ignore)[formControlName],
    textarea:not([readonly]):not(.ng-trim-ignore)[formControl],
    textarea:not([readonly]):not(.ng-trim-ignore)[ngModel],
    :not([readonly]):not(.ng-trim-ignore)[ngDefaultControl]'
  `
})
export class TrimInputValueDirective extends DefaultValueAccessor {

  constructor( //
    _renderer: Renderer2, //
    _elementRef: ElementRef, //
    private control: NgControl, //
    @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean //
  ) {
    super(_renderer, _elementRef, _compositionMode);
  }

  @HostListener('input', ['$event.target.value'])
  ngOnChange = (val: string) => {
    this.onChange(val.trim());
  }

  @HostListener('blur', ['$event.target.value'])
  applyTrim(val: string) {
    this.writeValue(val.trim());
  }

  writeValue(value: any): void {
    if (typeof value === 'string') {
      value = value.trim();
    }

    super.writeValue(value);
  }

}
