import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IOPolicyHistoryCompareComponent } from './io-policy-history-compare.component';

describe('IOPolicyHistoryCompareComponent', () => {
  let component: IOPolicyHistoryCompareComponent;
  let fixture: ComponentFixture<IOPolicyHistoryCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IOPolicyHistoryCompareComponent]
    });
    fixture = TestBed.createComponent(IOPolicyHistoryCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
