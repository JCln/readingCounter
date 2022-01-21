import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoImportDgComponent } from './auto-import-dg.component';

describe('AutoImportDgComponent', () => {
  let component: AutoImportDgComponent;
  let fixture: ComponentFixture<AutoImportDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoImportDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoImportDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
