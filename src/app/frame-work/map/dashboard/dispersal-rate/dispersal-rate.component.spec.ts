import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispersalRateComponent } from './dispersal-rate.component';

describe('DispersalRateComponent', () => {
  let component: DispersalRateComponent;
  let fixture: ComponentFixture<DispersalRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispersalRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispersalRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
