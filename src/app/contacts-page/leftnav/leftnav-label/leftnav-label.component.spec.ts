import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftnavLabelComponent } from './leftnav-label.component';

xdescribe('LeftnavLabelComponent', () => {
  let component: LeftnavLabelComponent;
  let fixture: ComponentFixture<LeftnavLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftnavLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftnavLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
