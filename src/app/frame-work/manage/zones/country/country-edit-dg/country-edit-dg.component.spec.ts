import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryEditDgComponent } from './country-edit-dg.component';

describe('CountryEditDgComponent', () => {
  let component: CountryEditDgComponent;
  let fixture: ComponentFixture<CountryEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
