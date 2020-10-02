import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCheckboxComponent } from './mat-checkbox.component';

describe('MatCheckboxComponent', () => {
  let component: MatCheckboxComponent;
  let fixture: ComponentFixture<MatCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
