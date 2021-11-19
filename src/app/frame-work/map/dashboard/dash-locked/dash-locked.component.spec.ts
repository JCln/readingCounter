import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLockedComponent } from './dash-locked.component';

describe('DashLockedComponent', () => {
  let component: DashLockedComponent;
  let fixture: ComponentFixture<DashLockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashLockedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashLockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
