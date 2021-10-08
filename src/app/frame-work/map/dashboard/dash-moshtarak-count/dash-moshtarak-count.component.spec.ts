import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMoshtarakCountComponent } from './dash-moshtarak-count.component';

describe('DashMoshtarakCountComponent', () => {
  let component: DashMoshtarakCountComponent;
  let fixture: ComponentFixture<DashMoshtarakCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashMoshtarakCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashMoshtarakCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
