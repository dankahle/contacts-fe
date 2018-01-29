import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LeftnavPO} from './leftnav.po';



fdescribe('leftnav', () => {
  const marginLeftOpen = '0px';
  const marginLeftClosed = '-259px';
  const absolute = 'absolute';
  let po: LeftnavPO;

  beforeAll(async () => {
    browser.get('/');
    po = new LeftnavPO();
    po.innerHeight = <number> await browser.executeScript('return window.innerHeight');
  });

  // xs or sm hide
  // lt-md  and lastBreakpoint (md/lg/xl) close
  // gt-sm and lastBreakpoint xs/sm and !wasClosed, open

/*
* header button opens/closes
* open for 900, 1020, 1100, 1980
* closed for lt-sm 899
* close for gt-sm if was closed before going lt-sm
* do some for walking down in size withoug refresh, then do some with refresh
*

breakpoints

xs:
sm:
md: 1020
lg: 1100

test:
1980, 1100, 1020,
 */


  it('should show and hide on breakpoints', async () => {
    po.resizeWindow(1980);
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('position')).not.toBe('absolute');
    po.resizeWindow(1100);
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('position')).not.toBe('absolute');
    po.resizeWindow(1021); // 1020 should have worked, but was already position: absolute there
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('position')).not.toBe('absolute');
    po.resizeWindow(1019);
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('left')).toBe('-259px');
    expect(po.leftnav.getCssValue('position')).toBe('absolute');
    po.resizeWindow(900);
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('left')).toBe('-259px');
    expect(po.leftnav.getCssValue('position')).toBe('absolute');
    po.resizeWindow(768);
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('left')).toBe('-259px');
    expect(po.leftnav.getCssValue('position')).toBe('absolute');
  });


})
