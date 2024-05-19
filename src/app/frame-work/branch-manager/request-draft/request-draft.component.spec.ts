import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDraftComponent } from './request-draft.component';

describe('RequestDraftComponent', () => {
  let component: RequestDraftComponent;
  let fixture: ComponentFixture<RequestDraftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDraftComponent]
    });
    fixture = TestBed.createComponent(RequestDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
