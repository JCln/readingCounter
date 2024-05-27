import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDraftGetlazyComponent } from './request-draft-getlazy.component';

describe('RequestDraftGetlazyComponent', () => {
  let component: RequestDraftGetlazyComponent;
  let fixture: ComponentFixture<RequestDraftGetlazyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDraftGetlazyComponent]
    });
    fixture = TestBed.createComponent(RequestDraftGetlazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
