import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingGroupComponent } from './offering-group.component';

describe('OfferingGroupComponent', () => {
  let component: OfferingGroupComponent;
  let fixture: ComponentFixture<OfferingGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingGroupComponent]
    });
    fixture = TestBed.createComponent(OfferingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
