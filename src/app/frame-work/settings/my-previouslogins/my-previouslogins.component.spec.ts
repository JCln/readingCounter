import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPreviousloginsComponent } from './my-previouslogins.component';

describe('MyPreviousloginsComponent', () => {
  let component: MyPreviousloginsComponent;
  let fixture: ComponentFixture<MyPreviousloginsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPreviousloginsComponent]
    });
    fixture = TestBed.createComponent(MyPreviousloginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
