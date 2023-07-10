import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticImportComponent } from './automatic-import.component';

describe('AutomaticImportComponent', () => {
  let component: AutomaticImportComponent;
  let fixture: ComponentFixture<AutomaticImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomaticImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
