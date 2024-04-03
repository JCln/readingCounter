import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffParameterComponent } from './tariff-parameter.component';

describe('TariffParameterComponent', () => {
  let component: TariffParameterComponent;
  let fixture: ComponentFixture<TariffParameterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffParameterComponent]
    });
    fixture = TestBed.createComponent(TariffParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
