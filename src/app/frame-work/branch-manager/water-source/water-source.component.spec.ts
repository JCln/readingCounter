import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSourceComponent } from './water-source.component';

describe('WaterSourceComponent', () => {
  let component: WaterSourceComponent;
  let fixture: ComponentFixture<WaterSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterSourceComponent]
    });
    fixture = TestBed.createComponent(WaterSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
