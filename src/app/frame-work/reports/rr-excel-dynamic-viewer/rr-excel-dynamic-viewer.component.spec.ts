import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrExcelDynamicViewerComponent } from './rr-excel-dynamic-viewer.component';

describe('RrExcelDynamicViewerComponent', () => {
  let component: RrExcelDynamicViewerComponent;
  let fixture: ComponentFixture<RrExcelDynamicViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrExcelDynamicViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrExcelDynamicViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
