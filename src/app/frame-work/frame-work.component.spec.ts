import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameWorkComponent } from './frame-work.component';

describe('FrameWorkComponent', () => {
  let component: FrameWorkComponent;
  let fixture: ComponentFixture<FrameWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
