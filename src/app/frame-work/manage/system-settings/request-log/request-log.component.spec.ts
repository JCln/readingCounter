import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLogComponent } from './request-log.component';

describe('RequestLogComponent', () => {
  let component: RequestLogComponent;
  let fixture: ComponentFixture<RequestLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
