import {$, $$, browser, ElementFinder, protractor} from 'protractor';
import {LeftnavPO} from './leftnav.po';



describe('##### leftnav tests', () => {
  const po = new LeftnavPO();

  beforeAll(async () => {
    po.refreshDbAndSetPage('/');
  });

  function openMdLgXl() {
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('position')).not.toBe('absolute');
  }

  function closedMdLgXl() {
    expect(po.leftnav.getCssValue('margin-left')).toBe('-259px');
    expect(po.leftnav.getCssValue('position')).not.toBe('absolute');
  }

  function openMdLgXlRefresh() {
    openMdLgXl();
    browser.refresh();
    openMdLgXl();
  }

  function openXsSm() {
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('left')).toBe('0px');
    expect(po.leftnav.getCssValue('position')).toBe('absolute');
  }

  function closedXsSm() {
    expect(po.leftnav.getCssValue('margin-left')).toBe('0px');
    expect(po.leftnav.getCssValue('left')).toBe('-259px');
    expect(po.leftnav.getCssValue('position')).toBe('absolute');
  }

  function closedXsSmRefresh() {
    closedXsSm();
    browser.refresh();
    closedXsSm();
  }

  /**
   * we're looking at 2 things here: user changing window width and opening page at a certain width. One may work
   * and the other not, so we test both ways: resize, test, refresh, test
   */
  it('should show and hide on breakpoints', async () => {
    po.resizeWindow(1980);
    openMdLgXlRefresh();
    po.resizeWindow(1021); // 1020 should have worked, but was already position: absolute there
    openMdLgXlRefresh();
    po.resizeWindow(1019);
    closedXsSmRefresh();
    po.resizeWindow(768);
    closedXsSmRefresh();
    po.resizeWindow(1980);
  });

  it('should open and close with header button (md/lg/xl)', () => {
    browser.refresh();
    po.resizeWindow(1021);
    openMdLgXl();
    po.leftnavButtonClick();
    closedMdLgXl();
    po.leftnavButtonClick();
    openMdLgXl();
    po.resizeWindow(1980);
  });

  it('should open and close with header button (xs/sm)', () => {
    browser.refresh();
    po.resizeWindow(1019);
    closedXsSm();
    po.leftnavButtonClick();
    openXsSm();
    po.leftnavButtonClick();
    closedXsSm();
    po.resizeWindow(1980);
  });

  it('should close on lt-md and reopen md', () => {
    browser.refresh();
    po.resizeWindow(1980);
    openMdLgXl();
    po.resizeWindow(1019);
    closedXsSm();
    po.resizeWindow(1021);
    openMdLgXl();
    po.resizeWindow(1980);
  });

  // should stay closed when they size lower than md, then go back to md, if they closed it with button while md+
  it('should stay closed when closed gt-sm, then lt-md, then gt-sm', () => {
    browser.refresh();
    po.resizeWindow(1980);
    openMdLgXl();
    po.leftnavButtonClick();
    closedMdLgXl();
    po.resizeWindow(1019);
    closedXsSm();
    po.resizeWindow(1021);
    closedMdLgXl();
    po.resizeWindow(1980);
    closedMdLgXl();
    po.resizeWindow(1980);
  });

})
