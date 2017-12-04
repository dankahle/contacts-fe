import {BreakPoint} from '@angular/flex-layout';

export const CONTACTS_DEFAULT_BREAKPOINTS: BreakPoint[] = [
  {
    alias: 'xs',
    mediaQuery: '(min-width: 0px) and (max-width: 899px)'
  },
  {
    alias: 'gt-xs',
    overlapping: true,
    mediaQuery: '(min-width: 900px)'
  },
  {
    alias: 'lt-sm',
    overlapping: true,
    mediaQuery: '(max-width: 899px)'
  },
  {
    alias: 'sm',
    mediaQuery: '(min-width: 900px) and (max-width: 1019px)'
  },
  {
    alias: 'gt-sm',
    overlapping: true,
    mediaQuery: '(min-width: 1020px)'
  },
  {
    alias: 'lt-md',
    overlapping: true,
    mediaQuery: '(max-width: 1019px)'
  },
  {
    alias: 'md',
    mediaQuery: '(min-width: 1020px) and (max-width: 1099px)'
  },
  {
    alias: 'gt-md',
    overlapping: true,
    mediaQuery: '(min-width: 1100px)'
  },
  {
    alias: 'lt-lg',
    overlapping: true,
    mediaQuery: '(max-width: 1099px)'
  },
  {
    alias: 'lg',
    mediaQuery: '(min-width: 1100px) and (max-width: 1299px)'
  },
  {
    alias: 'gt-lg',
    overlapping: true,
    mediaQuery: '(min-width: 1300px)'
  },
  {
    alias: 'lt-xl',
    overlapping: true,
    mediaQuery: '(max-width: 1299px)'
  },
  {
    alias: 'xl',
    mediaQuery: '(min-width: 1300px) and (max-width: 5000px)'
  }
];
