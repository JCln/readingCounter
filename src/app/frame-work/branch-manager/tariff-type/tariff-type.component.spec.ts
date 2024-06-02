import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffTypeComponent } from './tariff-type.component';

describe('TariffTypeComponent', () => {
  let component: TariffTypeComponent;
  let fixture: ComponentFixture<TariffTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffTypeComponent]
    });
    fixture = TestBed.createComponent(TariffTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
