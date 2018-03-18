import {DebugElement} from '@angular/core';
import {ComponentFixture, tick} from '@angular/core/testing';
import * as deepEqual from 'deep-equal';
/** Wait a tick, then detect changes */
export function advance(f: ComponentFixture<any>): void {
  tick();
  f.detectChanges();
}

/**
 * Create custom DOM event the old fashioned way
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent
 * Although officially deprecated, some browsers (phantom) don't accept the preferred "new Event(eventName)"
 */
export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

// See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left:  { button: 0 },
  right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

export function dispatchHtmlEvent(elem: EventTarget, eventName: string) {
  elem.dispatchEvent(new Event(eventName));
}

export function toPlainObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Thought this would be the way to go as jasmine matcher toEqual can't handle class instances, but this is just gonna return a boolean, whereas toEqual will
// throw a message stating which property is missing or not equal (better). So we'll just use the toPlainObject helper above to convert to a plain object and
// .toEqual matcher.
export function deepEql(val1, val2) {
  // by default uses == on leafs, strict will force === on leafs
  return deepEqual(val1, val2, {strict: true});
}
