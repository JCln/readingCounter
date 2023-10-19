import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMemoryStatusComponent } from './log-memory-status.component';

describe('LogMemoryStatusComponent', () => {
  let component: LogMemoryStatusComponent;
  let fixture: ComponentFixture<LogMemoryStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogMemoryStatusComponent]
    });
    fixture = TestBed.createComponent(LogMemoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
