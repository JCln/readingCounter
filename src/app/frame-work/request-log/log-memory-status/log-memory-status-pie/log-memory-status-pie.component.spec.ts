import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogMemoryStatusPieComponent } from './log-memory-status-pie.component';

describe('LogMemoryStatusPieComponent', () => {
  let component: LogMemoryStatusPieComponent;
  let fixture: ComponentFixture<LogMemoryStatusPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogMemoryStatusPieComponent]
    });
    fixture = TestBed.createComponent(LogMemoryStatusPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
