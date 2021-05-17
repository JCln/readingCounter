import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QotrAddDgComponent } from './qotr-add-dg.component';

describe('QotrAddDgComponent', () => {
  let component: QotrAddDgComponent;
  let fixture: ComponentFixture<QotrAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QotrAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QotrAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
