import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpFilterComponent } from './ip-filter.component';

describe('IpFilterComponent', () => {
  let component: IpFilterComponent;
  let fixture: ComponentFixture<IpFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpFilterComponent]
    });
    fixture = TestBed.createComponent(IpFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
