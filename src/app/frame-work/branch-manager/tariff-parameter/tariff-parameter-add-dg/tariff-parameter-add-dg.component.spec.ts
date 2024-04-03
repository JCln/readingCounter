import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffParameterAddDgComponent } from './tariff-parameter-add-dg.component';

describe('TariffParameterAddDgComponent', () => {
  let component: TariffParameterAddDgComponent;
  let fixture: ComponentFixture<TariffParameterAddDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffParameterAddDgComponent]
    });
    fixture = TestBed.createComponent(TariffParameterAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
