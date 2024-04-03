import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingComponent } from './offering.component';

describe('OfferingComponent', () => {
  let component: OfferingComponent;
  let fixture: ComponentFixture<OfferingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingComponent]
    });
    fixture = TestBed.createComponent(OfferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
