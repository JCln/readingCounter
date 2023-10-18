import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RlUsSelectZoneComponent } from './rl-us-select-zone.component';

describe('RlUsSelectZoneComponent', () => {
  let component: RlUsSelectZoneComponent;
  let fixture: ComponentFixture<RlUsSelectZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RlUsSelectZoneComponent]
    });
    fixture = TestBed.createComponent(RlUsSelectZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
