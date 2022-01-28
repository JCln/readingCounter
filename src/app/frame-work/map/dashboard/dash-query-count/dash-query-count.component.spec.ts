import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashQueryCountComponent } from './dash-query-count.component';

describe('DashQueryCountComponent', () => {
  let component: DashQueryCountComponent;
  let fixture: ComponentFixture<DashQueryCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashQueryCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashQueryCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
