import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffTypeDgComponent } from './tariff-type-dg.component';

describe('TariffTypeDgComponent', () => {
  let component: TariffTypeDgComponent;
  let fixture: ComponentFixture<TariffTypeDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffTypeDgComponent]
    });
    fixture = TestBed.createComponent(TariffTypeDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
