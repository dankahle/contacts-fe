import {BreakPoint} from '@angular/flex-layout';

export const DEFAULT_BREAKPOINTS: BreakPoint[] = [
  {
    alias: 'xs',
    mediaQuery: '(min-width: 0px) and (max-width: 599px)'
  },
  {
    alias: 'gt-xs',
    overlapping: true,
    mediaQuery: '(min-width: 600px)'
  },
  {
    alias: 'lt-sm',
    overlapping: true,
    mediaQuery: '(max-width: 599px)'
  },
  {
    alias: 'sm',
    mediaQuery: '(min-width: 600px) and (max-width: 959px)'
  },
  {
    alias: 'gt-sm',
    overlapping: true,
    mediaQuery: '(min-width: 960px)'
  },
  {
    alias: 'lt-md',
    overlapping: true,
    mediaQuery: '(max-width: 959px)'
  },
  {
    alias: 'md',
    mediaQuery: '(min-width: 960px) and (max-width: 1279px)'
  },
  {
    alias: 'gt-md',
    overlapping: true,
    mediaQuery: '(min-width: 1280px)'
  },
  {
    alias: 'lt-lg',
    overlapping: true,
    mediaQuery: '(max-width: 1279px)'
  },
  {
    alias: 'lg',
    mediaQuery: '(min-width: 1280px) and (max-width: 1919px)'
  },
  {
    alias: 'gt-lg',
    overlapping: true,
    mediaQuery: '(min-width: 1920px)'
  },
  {
    alias: 'lt-xl',
    overlapping: true,
    mediaQuery: '(max-width: 1920px)'
  },
  {
    alias: 'xl',
    mediaQuery: '(min-width: 1920px) and (max-width: 5000px)'
  }
];
