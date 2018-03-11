import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {getProviderMocks} from '../testing/mocks/provider-mocks';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {getContacts, getUser} from '../testing/mocks/store-mock';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [AppComponent],
      providers: getProviderMocks(),
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('store should be filled out', () => {
    expect(comp.store.con.contacts).toEqual(getContacts());
    expect(comp.store.usr.user).toEqual(getUser());
  });

  it('store objects should NOT be ===', () => {
    expect(comp.store.con.contacts).not.toBe(getContacts());
    expect(comp.store.usr.user).not.toBe(getUser());
  });

});
