import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDynamicComponent } from './import-dynamic.component';

describe('ImportDynamicComponent', () => {
  let component: ImportDynamicComponent;
  let fixture: ComponentFixture<ImportDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
