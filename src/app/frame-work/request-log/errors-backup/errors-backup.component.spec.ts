import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsBackupComponent } from './errors-backup.component';

describe('ErrorsBackupComponent', () => {
  let component: ErrorsBackupComponent;
  let fixture: ComponentFixture<ErrorsBackupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsBackupComponent]
    });
    fixture = TestBed.createComponent(ErrorsBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
