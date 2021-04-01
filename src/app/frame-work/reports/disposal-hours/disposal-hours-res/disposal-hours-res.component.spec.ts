import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalHoursResComponent } from './disposal-hours-res.component';

describe('DisposalHoursResComponent', () => {
  let component: DisposalHoursResComponent;
  let fixture: ComponentFixture<DisposalHoursResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposalHoursResComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalHoursResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
