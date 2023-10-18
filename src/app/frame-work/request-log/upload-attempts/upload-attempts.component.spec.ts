import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAttemptsComponent } from './upload-attempts.component';

describe('UploadAttemptsComponent', () => {
  let component: UploadAttemptsComponent;
  let fixture: ComponentFixture<UploadAttemptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadAttemptsComponent]
    });
    fixture = TestBed.createComponent(UploadAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
