import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingGroupDgComponent } from './offering-group-dg.component';

describe('OfferingGroupDgComponent', () => {
  let component: OfferingGroupDgComponent;
  let fixture: ComponentFixture<OfferingGroupDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingGroupDgComponent]
    });
    fixture = TestBed.createComponent(OfferingGroupDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
