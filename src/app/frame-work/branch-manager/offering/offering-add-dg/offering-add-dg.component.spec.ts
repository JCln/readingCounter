import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingAddDgComponent } from './offering-add-dg.component';

describe('OfferingAddDgComponent', () => {
  let component: OfferingAddDgComponent;
  let fixture: ComponentFixture<OfferingAddDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingAddDgComponent]
    });
    fixture = TestBed.createComponent(OfferingAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
