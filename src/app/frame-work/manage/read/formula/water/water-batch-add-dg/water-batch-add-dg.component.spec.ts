import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterBatchAddDgComponent } from './water-batch-add-dg.component';

describe('WaterBatchAddDgComponent', () => {
  let component: WaterBatchAddDgComponent;
  let fixture: ComponentFixture<WaterBatchAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterBatchAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterBatchAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
