import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffAllLazyComponent } from './tariff-all-lazy.component';

describe('TariffAllLazyComponent', () => {
  let component: TariffAllLazyComponent;
  let fixture: ComponentFixture<TariffAllLazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffAllLazyComponent]
    });
    fixture = TestBed.createComponent(TariffAllLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
