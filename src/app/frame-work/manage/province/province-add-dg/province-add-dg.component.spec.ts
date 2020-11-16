import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceAddDgComponent } from './province-add-dg.component';

describe('ProvinceAddDgComponent', () => {
  let component: ProvinceAddDgComponent;
  let fixture: ComponentFixture<ProvinceAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
