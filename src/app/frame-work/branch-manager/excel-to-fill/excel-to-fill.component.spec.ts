import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelToFillComponent } from './excel-to-fill.component';

describe('ExcelToFillComponent', () => {
  let component: ExcelToFillComponent;
  let fixture: ComponentFixture<ExcelToFillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelToFillComponent]
    });
    fixture = TestBed.createComponent(ExcelToFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
