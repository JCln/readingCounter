import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyHistoryDetailsComponent } from './policy-history-details.component';

describe('PolicyHistoryDetailsComponent', () => {
  let component: PolicyHistoryDetailsComponent;
  let fixture: ComponentFixture<PolicyHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyHistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
