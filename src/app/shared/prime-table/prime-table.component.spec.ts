import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeTableComponent } from './prime-table.component';

describe('PrimeTableComponent', () => {
  let component: PrimeTableComponent;
  let fixture: ComponentFixture<PrimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
