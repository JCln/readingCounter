import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceEditDgComponent } from './province-edit-dg.component';

describe('ProvinceEditDgComponent', () => {
  let component: ProvinceEditDgComponent;
  let fixture: ComponentFixture<ProvinceEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
