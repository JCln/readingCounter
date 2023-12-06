import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedEditedComponent } from './imported-edited.component';

describe('ImportedEditedComponent', () => {
  let component: ImportedEditedComponent;
  let fixture: ComponentFixture<ImportedEditedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportedEditedComponent]
    });
    fixture = TestBed.createComponent(ImportedEditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
