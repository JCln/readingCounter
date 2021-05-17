import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAddDgComponent } from './country-add-dg.component';

describe('CountryAddDgComponent', () => {
  let component: CountryAddDgComponent;
  let fixture: ComponentFixture<CountryAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
