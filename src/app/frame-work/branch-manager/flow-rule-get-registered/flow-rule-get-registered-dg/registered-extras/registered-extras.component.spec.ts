import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredExtrasComponent } from './registered-extras.component';

describe('RegisteredExtrasComponent', () => {
  let component: RegisteredExtrasComponent;
  let fixture: ComponentFixture<RegisteredExtrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredExtrasComponent]
    });
    fixture = TestBed.createComponent(RegisteredExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
