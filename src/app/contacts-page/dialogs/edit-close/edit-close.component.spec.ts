import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCloseComponent } from './edit-close.component';

describe('EditCloseComponent', () => {
  let component: EditCloseComponent;
  let fixture: ComponentFixture<EditCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
