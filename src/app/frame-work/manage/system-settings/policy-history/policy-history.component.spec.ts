import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyHistoryComponent } from './policy-history.component';

describe('PolicyHistoryComponent', () => {
  let component: PolicyHistoryComponent;
  let fixture: ComponentFixture<PolicyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
