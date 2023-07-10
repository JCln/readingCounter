import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelBuilderComponent } from './excel-builder.component';

describe('ExcelBuilderComponent', () => {
  let component: ExcelBuilderComponent;
  let fixture: ComponentFixture<ExcelBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
