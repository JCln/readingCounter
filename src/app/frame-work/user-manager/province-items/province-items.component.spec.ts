import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceItemsComponent } from './province-items.component';

describe('ProvinceItemsComponent', () => {
  let component: ProvinceItemsComponent;
  let fixture: ComponentFixture<ProvinceItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinceItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
