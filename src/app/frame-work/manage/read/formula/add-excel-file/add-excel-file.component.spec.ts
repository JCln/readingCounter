import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcelFileComponent } from './add-excel-file.component';

describe('AddExcelFileComponent', () => {
  let component: AddExcelFileComponent;
  let fixture: ComponentFixture<AddExcelFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExcelFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExcelFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
