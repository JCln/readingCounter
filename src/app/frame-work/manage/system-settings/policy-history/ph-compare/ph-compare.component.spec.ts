import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhCompareComponent } from './ph-compare.component';

describe('PhCompareComponent', () => {
  let component: PhCompareComponent;
  let fixture: ComponentFixture<PhCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhCompareComponent]
    });
    fixture = TestBed.createComponent(PhCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
