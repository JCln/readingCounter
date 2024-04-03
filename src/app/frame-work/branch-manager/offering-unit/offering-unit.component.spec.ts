import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingUnitComponent } from './offering-unit.component';

describe('OfferingUnitComponent', () => {
  let component: OfferingUnitComponent;
  let fixture: ComponentFixture<OfferingUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingUnitComponent]
    });
    fixture = TestBed.createComponent(OfferingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
