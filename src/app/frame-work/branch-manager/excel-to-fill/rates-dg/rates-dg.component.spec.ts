import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesDgComponent } from './rates-dg.component';

describe('RatesDgComponent', () => {
  let component: RatesDgComponent;
  let fixture: ComponentFixture<RatesDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatesDgComponent]
    });
    fixture = TestBed.createComponent(RatesDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
