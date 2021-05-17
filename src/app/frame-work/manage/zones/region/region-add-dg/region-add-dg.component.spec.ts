import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionAddDgComponent } from './region-add-dg.component';

describe('RegionAddDgComponent', () => {
  let component: RegionAddDgComponent;
  let fixture: ComponentFixture<RegionAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
