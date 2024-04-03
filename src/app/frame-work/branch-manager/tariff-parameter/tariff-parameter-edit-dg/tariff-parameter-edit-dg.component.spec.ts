import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffParameterEditDgComponent } from './tariff-parameter-edit-dg.component';

describe('TariffParameterEditDgComponent', () => {
  let component: TariffParameterEditDgComponent;
  let fixture: ComponentFixture<TariffParameterEditDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TariffParameterEditDgComponent]
    });
    fixture = TestBed.createComponent(TariffParameterEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
