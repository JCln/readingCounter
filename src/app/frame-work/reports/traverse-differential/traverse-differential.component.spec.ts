import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraverseDifferentialComponent } from './traverse-differential.component';

describe('TraverseDifferentialComponent', () => {
  let component: TraverseDifferentialComponent;
  let fixture: ComponentFixture<TraverseDifferentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraverseDifferentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraverseDifferentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
