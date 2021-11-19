import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDateDiffUncloseComponent } from './dash-date-diff-unclose.component';

describe('DashDateDiffUncloseComponent', () => {
  let component: DashDateDiffUncloseComponent;
  let fixture: ComponentFixture<DashDateDiffUncloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashDateDiffUncloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashDateDiffUncloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
