import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingUnitEditDgComponent } from './offering-unit-edit-dg.component';

describe('OfferingUnitEditDgComponent', () => {
  let component: OfferingUnitEditDgComponent;
  let fixture: ComponentFixture<OfferingUnitEditDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingUnitEditDgComponent]
    });
    fixture = TestBed.createComponent(OfferingUnitEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
