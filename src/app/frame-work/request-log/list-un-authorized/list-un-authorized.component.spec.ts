import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnAuthorizedComponent } from './list-un-authorized.component';

describe('ListUnAuthorizedComponent', () => {
  let component: ListUnAuthorizedComponent;
  let fixture: ComponentFixture<ListUnAuthorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUnAuthorizedComponent]
    });
    fixture = TestBed.createComponent(ListUnAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
