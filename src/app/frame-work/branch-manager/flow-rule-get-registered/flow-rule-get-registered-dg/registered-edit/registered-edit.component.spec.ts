import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredEditComponent } from './registered-edit.component';

describe('RegisteredEditComponent', () => {
  let component: RegisteredEditComponent;
  let fixture: ComponentFixture<RegisteredEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredEditComponent]
    });
    fixture = TestBed.createComponent(RegisteredEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
