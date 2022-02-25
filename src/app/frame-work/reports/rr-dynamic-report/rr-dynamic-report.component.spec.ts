import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrDynamicReportComponent } from './rr-dynamic-report.component';

describe('RrDynamicReportComponent', () => {
  let component: RrDynamicReportComponent;
  let fixture: ComponentFixture<RrDynamicReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrDynamicReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrDynamicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
