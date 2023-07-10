import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedComponent } from './imported.component';

describe('ImportedComponent', () => {
  let component: ImportedComponent;
  let fixture: ComponentFixture<ImportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
