import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingUnitAddDgComponent } from './offering-unit-add-dg.component';

describe('OfferingUnitAddDgComponent', () => {
  let component: OfferingUnitAddDgComponent;
  let fixture: ComponentFixture<OfferingUnitAddDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingUnitAddDgComponent]
    });
    fixture = TestBed.createComponent(OfferingUnitAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
