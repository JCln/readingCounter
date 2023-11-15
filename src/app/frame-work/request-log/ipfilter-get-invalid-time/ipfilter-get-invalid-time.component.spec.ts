import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpfilterGetInvalidTimeComponent } from './ipfilter-get-invalid-time.component';

describe('IpfilterGetInvalidTimeComponent', () => {
  let component: IpfilterGetInvalidTimeComponent;
  let fixture: ComponentFixture<IpfilterGetInvalidTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpfilterGetInvalidTimeComponent]
    });
    fixture = TestBed.createComponent(IpfilterGetInvalidTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
