import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditCloseComponent } from './contact-edit-close.component';

xdescribe('ContactEditCloseComponent', () => {
  let component: ContactEditCloseComponent;
  let fixture: ComponentFixture<ContactEditCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactEditCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEditCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
