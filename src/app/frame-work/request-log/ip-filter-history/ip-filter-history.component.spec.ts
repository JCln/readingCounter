import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpFilterHistoryComponent } from './ip-filter-history.component';

describe('IpFilterHistoryComponent', () => {
  let component: IpFilterHistoryComponent;
  let fixture: ComponentFixture<IpFilterHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpFilterHistoryComponent]
    });
    fixture = TestBed.createComponent(IpFilterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
