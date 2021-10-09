import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashShownReadingsComponent } from './dash-shown-readings.component';

describe('DashShownReadingsComponent', () => {
  let component: DashShownReadingsComponent;
  let fixture: ComponentFixture<DashShownReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashShownReadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashShownReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
