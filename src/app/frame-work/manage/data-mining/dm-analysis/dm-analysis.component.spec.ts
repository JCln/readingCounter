import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmAnalysisComponent } from './dm-analysis.component';

describe('DmAnalysisComponent', () => {
  let component: DmAnalysisComponent;
  let fixture: ComponentFixture<DmAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
