import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDraftDgComponent } from './request-draft-dg.component';

describe('RequestDraftDgComponent', () => {
  let component: RequestDraftDgComponent;
  let fixture: ComponentFixture<RequestDraftDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDraftDgComponent]
    });
    fixture = TestBed.createComponent(RequestDraftDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
