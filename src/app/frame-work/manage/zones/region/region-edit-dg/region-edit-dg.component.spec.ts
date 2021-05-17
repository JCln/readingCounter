import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionEditDgComponent } from './region-edit-dg.component';

describe('RegionEditDgComponent', () => {
  let component: RegionEditDgComponent;
  let fixture: ComponentFixture<RegionEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
