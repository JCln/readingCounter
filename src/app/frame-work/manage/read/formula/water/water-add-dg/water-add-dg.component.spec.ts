import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAddDgComponent } from './water-add-dg.component';

describe('WaterAddDgComponent', () => {
  let component: WaterAddDgComponent;
  let fixture: ComponentFixture<WaterAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaterAddDgComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
