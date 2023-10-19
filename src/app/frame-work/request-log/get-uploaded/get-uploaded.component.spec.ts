import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUploadedComponent } from './get-uploaded.component';

describe('GetUploadedComponent', () => {
  let component: GetUploadedComponent;
  let fixture: ComponentFixture<GetUploadedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUploadedComponent]
    });
    fixture = TestBed.createComponent(GetUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
