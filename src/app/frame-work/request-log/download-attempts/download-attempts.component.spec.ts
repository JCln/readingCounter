import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAttemptsComponent } from './download-attempts.component';

describe('DownloadAttemptsComponent', () => {
  let component: DownloadAttemptsComponent;
  let fixture: ComponentFixture<DownloadAttemptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadAttemptsComponent]
    });
    fixture = TestBed.createComponent(DownloadAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
