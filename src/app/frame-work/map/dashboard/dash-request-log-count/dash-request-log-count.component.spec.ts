import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRequestLogCountComponent } from './dash-request-log-count.component';

describe('DashRequestLogCountComponent', () => {
  let component: DashRequestLogCountComponent;
  let fixture: ComponentFixture<DashRequestLogCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashRequestLogCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashRequestLogCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
