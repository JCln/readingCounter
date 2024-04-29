import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffAllLazyDgComponent } from './tariff-all-lazy-dg.component';

describe('TariffAllLazyDgComponent', () => {
  let component: TariffAllLazyDgComponent;
  let fixture: ComponentFixture<TariffAllLazyDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffAllLazyDgComponent]
    });
    fixture = TestBed.createComponent(TariffAllLazyDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
