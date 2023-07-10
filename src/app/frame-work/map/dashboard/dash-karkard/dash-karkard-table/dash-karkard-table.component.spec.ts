import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashKarkardTableComponent } from './dash-karkard-table.component';

describe('DashKarkardTableComponent', () => {
  let component: DashKarkardTableComponent;
  let fixture: ComponentFixture<DashKarkardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashKarkardTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashKarkardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
