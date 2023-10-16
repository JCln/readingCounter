import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpfilterGetblockedComponent } from './ipfilter-getblocked.component';

describe('IpfilterGetblockedComponent', () => {
  let component: IpfilterGetblockedComponent;
  let fixture: ComponentFixture<IpfilterGetblockedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpfilterGetblockedComponent]
    });
    fixture = TestBed.createComponent(IpfilterGetblockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
