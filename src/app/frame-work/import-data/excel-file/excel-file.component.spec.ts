import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelFileComponent } from './excel-file.component';

describe('ExcelFileComponent', () => {
  let component: ExcelFileComponent;
  let fixture: ComponentFixture<ExcelFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
