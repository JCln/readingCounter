import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDraftFullViewComponent } from './request-draft-full-view.component';

describe('RequestDraftFullViewComponent', () => {
  let component: RequestDraftFullViewComponent;
  let fixture: ComponentFixture<RequestDraftFullViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDraftFullViewComponent]
    });
    fixture = TestBed.createComponent(RequestDraftFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
