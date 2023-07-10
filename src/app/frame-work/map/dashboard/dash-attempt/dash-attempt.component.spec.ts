import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAttemptComponent } from './dash-attempt.component';

describe('DashAttemptComponent', () => {
  let component: DashAttemptComponent;
  let fixture: ComponentFixture<DashAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAttemptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
