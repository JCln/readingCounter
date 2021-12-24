import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffTxtOutComponent } from './off-txt-out.component';

describe('OffTxtOutComponent', () => {
  let component: OffTxtOutComponent;
  let fixture: ComponentFixture<OffTxtOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffTxtOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffTxtOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
