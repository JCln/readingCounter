import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalHoursComponent } from './disposal-hours.component';

describe('DisposalHoursComponent', () => {
  let component: DisposalHoursComponent;
  let fixture: ComponentFixture<DisposalHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
