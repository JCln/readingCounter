import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPreviousFailuresComponent } from './my-previous-failures.component';

describe('MyPreviousFailuresComponent', () => {
  let component: MyPreviousFailuresComponent;
  let fixture: ComponentFixture<MyPreviousFailuresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPreviousFailuresComponent]
    });
    fixture = TestBed.createComponent(MyPreviousFailuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
