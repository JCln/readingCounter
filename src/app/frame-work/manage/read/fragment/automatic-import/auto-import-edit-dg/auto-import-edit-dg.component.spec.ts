import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoImportEditDgComponent } from './auto-import-edit-dg.component';

describe('AutoImportEditDgComponent', () => {
  let component: AutoImportEditDgComponent;
  let fixture: ComponentFixture<AutoImportEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoImportEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoImportEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
