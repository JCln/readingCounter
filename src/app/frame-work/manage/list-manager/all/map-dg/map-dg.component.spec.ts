import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDgComponent } from './map-dg.component';

describe('MapDgComponent', () => {
  let component: MapDgComponent;
  let fixture: ComponentFixture<MapDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
