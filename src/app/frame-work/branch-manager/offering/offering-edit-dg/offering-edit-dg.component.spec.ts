import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingEditDgComponent } from './offering-edit-dg.component';

describe('OfferingEditDgComponent', () => {
  let component: OfferingEditDgComponent;
  let fixture: ComponentFixture<OfferingEditDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingEditDgComponent]
    });
    fixture = TestBed.createComponent(OfferingEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
